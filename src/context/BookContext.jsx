import { createContext, useContext, useEffect, useState } from "react";

export const BookContext = createContext();

export default function BookContextProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState();

  const FormatCoin = (number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(number);

  const getData = async () => {
    try {
      const connectionString = "https://node-bookstore-ww7n.onrender.com/";
      const response = await fetch(connectionString + "api/v1/books");
      if (!response.ok) throw "No se puede desplegar la información";
      console.log(response);
      const { result } = await response.json();
      console.log(result);
      setBooks(result);
    } catch (error) {
      setError(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <BookContext.Provider
      value={{ books, setBooks, error, setError, FormatCoin }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => useContext(BookContext);
