import { useEffect, useState } from "react";
import FormAddress from "../components/FormAddress";

const Addresses = () => {
    const [address, setAddress] = useState(() =>
        JSON.parse(localStorage.getItem('Addresses')) || []
    );

    useEffect(() => {
        console.log(address);
    }, [address]);

    return (
        <div className="container mt-5 pt-5">
            <h2 className="text-center pt-5">Mis direcciones</h2>
            <p className="">Ingresa tu dirección para tus compras:</p>
            <div className="container">
                <FormAddress setAddress={setAddress} address={address} />
            </div>


            <div className="container pd-4 mt-5">
                <hr />
                <h5 className="mt-3">Listado de direcciones</h5>
                <ul className="mb-5 pb-5">
                    {address.map(({ id, region, commune, addressLine }) => {
                        return <li key={id}>{region}- {commune} - {addressLine}</li>
                    })}
                </ul>
            </div>
        </div>
    )
};

export default Addresses;
