import { useEffect, useState } from "react";
import FormAddress from "../components/FormAddress";

const Addresses = () => {
  const [address, setAddress] = useState(
    () => JSON.parse(localStorage.getItem("Addresses")) || []
  );

  const [regions, setRegions] = useState([]);
  const [commune, setComune] = useState();

  const getCommunes = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/addresses"
      );
      if (!response.ok) throw "No se puede desplegar la información";
      const data = await response.json();
      setRegions(data.result);
      console.log(regions);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAddresses = async (user_id = 2) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/user/" + user_id + "/addresses"
      );
      if (!response.ok) throw "No se puede desplegar la información";
      const data = await response.json();
      setAddress(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCommunes();
    getUserAddresses();
  }, []);

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
        {address.length ? (
          address.map(({ id, commune_name, address }) => {
            const i = +1;
            // Busca el nombre de la comuna correspondiente
            const communeName =
              regions.find((communes) => communes.name === commune_name)
                ?.name || "";
            console.log(
              regions.includes({ commune_name }),
              { commune_name },
              regions
            );
            return (
              <li key={id}>
                {i} - {communeName.commune_name} - {address}
              </li>
            );
          })
        ) : (
          <div>No tienes direcciones registradas</div>
        )}
        {/* <ul className="mb-5 pb-5">
                    {address.map(({ id, region, commune_id, address }) => {
                        return <li key={id}>{region}- {commune} - {address}</li>
                    })}
                </ul> */}
      </div>
    </div>
  );
};

export default Addresses;
