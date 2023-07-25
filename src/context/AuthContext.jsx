import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const initialStateToken = localStorage.getItem("accessToken");

export default function UserContextProvider({ children }) {
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(initialStateToken);


    // const getFavoritesFromLocalStorage = () => {
    //     const localFavorites = localStorage.getItem('favorites');
    //     return localFavorites ? JSON.parse(localFavorites) : [];
    // }
    const [favorites, setFavorites] = useState([]);

    const getFavorites = async (access_token) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/favorites`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            if (!response.ok) throw "No se puede desplegar la información";
            const data = await response.json()
            setFavorites(data.result)
        } catch (error) {
            console.log(error)
        }
    }

    const saveToken = async (access_token) => {
        try {
            setToken(access_token);
            await getUser(access_token);
            localStorage.setItem("accessToken", access_token);
        } catch (error) {
            console.log(error);
        }
    };

    const getUser = async (access_token) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const data = await res.json();
            setUser(data.result);
        } catch (error) {
            setUser(false);
        }
    };

    const logout = () => {
        setUser(false);
        setToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("");
        navigate("/")
    };

    useEffect(() => {
        if (token) {
            getUser(token);
            getFavorites(token);
        } else {
            setUser(false);
        }
        getFavorites(token)
    }, [token]);


    return (
        <AuthContext.Provider value={{ user, getUser, token, saveToken, logout, favorites, setFavorites }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);