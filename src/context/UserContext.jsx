import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [comunas, setComunas] = useState([]);
  const [error, setError] = useState();

  const getComunas = async () => {
    try {
      const res = await fetch("../comunas.json");
      const regiones = await res.json();
      console.log(res, regiones[0]);
      setComunas(regiones[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComunas(), [];
  });

  return (
    <UserContext.Provider value={{ comunas, setComunas, error, setError }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
