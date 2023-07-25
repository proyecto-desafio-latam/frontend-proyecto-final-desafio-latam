import { useEffect, useState } from "react";
import FormAddress from "../components/FormAddress";

const Addresses = () => {
  const [address, setAddress] = useState(
    () => JSON.parse(localStorage.getItem("Addresses")) || []
  );

  const [commune, setCommune] = useState([]);
  const getCommunes = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/addresses"
      );
      if (!response.ok) throw "No se puede desplegar la información";
      const data = await response.json();
      console.log(data.result);
      setCommune(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommunes();
  }, [address]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center pt-5">Mis direcciones</h2>
      <p className="">Ingresa tu dirección para tus compras:</p>
      <div className="container">
        {/* <FormAddress setAddress={setAddress} address={address} /> */}
        <FormAddress
          setAddress={setAddress}
          address={address}
          commune={commune}
        />
      </div>

      <div className="container pd-4 mt-5">
        <hr />
        <h5 className="mt-3">Listado de direcciones</h5>
        {address.map(({ id, region, communeId, addressLine }) => {
          // Busca el nombre de la comuna correspondiente
          const communeName =
            commune.find((commune) => commune.id === communeId)?.name || "";
          return (
            <li key={id}>
              {region} - {communeName.commune} - {addressLine}
            </li>
          );
        })}
        {/* <ul className="mb-5 pb-5">
                    {address.map(({ id, region, communeId, addressLine }) => {
                        return <li key={id}>{region}- {commune} - {addressLine}</li>
                    })}
                </ul> */}
      </div>
    </div>
  );
};

export default Addresses;
