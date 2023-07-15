import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const initialStateToken = localStorage.getItem("accessToken");

export default function UserContextProvider({ children }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(initialStateToken);


    const getFavoritesFromLocalStorage = () => {
        const localFavorites = localStorage.getItem('favorites');
        return localFavorites ? JSON.parse(localFavorites) : [];
    }
    
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage);

    useEffect(() => {
        if (token) {
            getUser(token);
        } else {
            setUser(false);
        }
    }, []);

    const getUser = async (access_token) => {
        try {
            const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const data = await res.json();
            setUser(data);
        } catch (error) {
            setUser(false);
        }
    };

    const saveToken = async (access_token) => {
        try {
            setToken(access_token);
            await getUser(access_token);
            localStorage.setItem("accessToken", access_token);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(false);
        setToken(null);
        localStorage.removeItem("accessToken");
        navigate("/")
    };

    return (
        <AuthContext.Provider value={{ user, getUser, token, saveToken, logout, favorites, setFavorites }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);