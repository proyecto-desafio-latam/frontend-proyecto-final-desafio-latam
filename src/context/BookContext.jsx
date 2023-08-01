import { createContext, useContext, useEffect, useState } from "react";

export const BookContext = createContext();

export default function BookContextProvider({ children }) {
  const [book, setBook] = useState([])
  const [books, setBooks] = useState([]);
  const [error, setError] = useState();

  const FormatCoin = (number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(number);

  const getData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}books`);
      if (!response.ok) throw "No se puede desplegar la información";
      const { result } = await response.json();
      setBooks(result);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getBook = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}books/${id}`);
      if (!response.ok) throw "No se puede desplegar la información";
      const data = await response.json();
      setBook(data.result);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <BookContext.Provider
      value={{ books, setBooks, getData, error, setError, FormatCoin, book, setBook, getBook }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => useContext(BookContext);
