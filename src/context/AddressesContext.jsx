import { createContext, useState, useContext, useEffect } from "react";

export const AddressesContext = createContext();

export default function AddressesContextProvider({ children }) {
    const [userAddresses, setUserAddresses] = useState([]);
    const [selectedAddresses, setSelectedAddresses] = useState({});

    const getAddresses = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/v1/user/${user.id}/addresses`)
            const { result } = await response.json();
            console.log(result)
            setUserAddresses(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AddressesContext.Provider value={{userAddresses, setUserAddresses, selectedAddresses, setSelectedAddresses}}>
            {children}
        </AddressesContext.Provider>
    );
}

export const useAddressesContext = () => useContext(AddressesContext);