import { createContext, useState, useContext, useEffect } from "react";
import { useAuthContext } from '../context/AuthContext';

export const AddressesContext = createContext();

export default function AddressesContextProvider({ children }) {
    const [userAddresses, setUserAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({});

    const { user } = useAuthContext();

    const getAddresses = async () => {
        try {
            const response = await fetch(`http://localhost:3002/api/v1/user/${user.id}/addresses`)
            const { result } = await response.json();
            console.log('Mis direcciones');
            console.log(result);
            setUserAddresses(result);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     getAddresses();
    //   }, []);

    // 
    useEffect(() => {
        // Si existe user y obviamente user.id no es nulo se ejecuta getAddresses
        // Esto ocurrirá cada vez que usuario tome otro valor => [user]
        if (user && user.id) {
            getAddresses();
        }
    }, [user]);


    return (
        <AddressesContext.Provider
            value={{ userAddresses, setUserAddresses, selectedAddress, setSelectedAddress, getAddresses }}
        >
            {children}
        </AddressesContext.Provider>
    );
}

export const useAddressesContext = () => useContext(AddressesContext);