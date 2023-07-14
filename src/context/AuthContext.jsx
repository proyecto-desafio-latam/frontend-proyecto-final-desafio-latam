import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext()

const initialStateToken = localStorage.getItem("token");

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(initialStateToken);

    useEffect(() => {
        if (token) {
            getProfileUser(token);
        } else {
            setUser(false);
        }
    }, []);

    const getProfileUser = async (access_token) => {
        try {
            const res = await fetch(" https://api.escuelajs.co/api/v1/auth/login", {
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
            await getProfileUser(access_token);
            localStorage.setItem("token", access_token);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        setUser(false);
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, getProfileUser, token, saveToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);