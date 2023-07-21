import { createContext, useContext, useEffect, useState } from "react";

export const BookContext = createContext()

export default function BookContextProvider({ children }) {
    const [books, setBooks] = useState([])
    const [error, setError] = useState()

    const FormatCoin = (number) => 
    ( new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(number))

    const getData = async () => {
        try {
            // const response = await fetch("/inventory.json")
            const response = await fetch("http://localhost:3002/api/v1/books")
            if (!response.ok) throw "No se puede desplegar la información"
            const data = await response.json()
            // console.log(data)
            // console.log(data.result)
            // setBooks(data)
            setBooks(data.result)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return(
        <BookContext.Provider value={{books, setBooks, error, setError, FormatCoin}}>
            {children}
        </BookContext.Provider>
    )
}

export const useBookContext = () => useContext(BookContext);