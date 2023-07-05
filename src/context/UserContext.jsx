import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [books, setBooks] = useState([])
    const [error, setError] = useState()

    const getData = async () => {
        try {
            const response = await fetch("/inventory.json")
            if (!response.ok) throw "No se puede desplegar la información"
            const data = await response.json()
            setBooks(data)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return(
        <UserContext.Provider value={{books, setBooks, error, setError}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);