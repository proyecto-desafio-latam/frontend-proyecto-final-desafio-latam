import { useEffect, useState } from "react";
import FormAddress from "../components/FormAddress";
import { useAuthContext } from "../context/AuthContext";

const Addresses = () => {
  // const [address, setAddress] = useState(
  //   () => JSON.parse(localStorage.getItem("Addresses")) || []
  // );
  const [address, setAddress] = useState([]);

  // const [commune, setCommune] = useState([]);
  const { user } = useAuthContext();

  const getCommunes = async () => {
    try {
      console.log('Soy el usuario: ' + user.id);
      // const response = await fetch("https://node-bookstore-ww7n.onrender.com/api/v1/addresses");
      const response = await fetch(`http://localhost:3002/api/v1/user/${user.id}/addresses`);
      if (!response.ok) throw "No se puede desplegar la información";
      const data = await response.json();
      console.log(data.result);
      // setCommune(data.result);
      setAddress(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(address);
    getCommunes();
  }, []);
  // }, [address]);

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center pt-5">Mis direcciones</h2>
      <p className="">Ingresa tu dirección para tus compras:</p>
      <div className="container">
        {/* <FormAddress setAddress={setAddress} address={address} /> */}
        <FormAddress setAddress={setAddress} address={address} />
      </div>

      <div className="container pd-4 mt-5">
        <hr />
        <h5 className="mt-3">Listado de direcciones🧭</h5>
        <table>
          <thead>
            <tr>
              <th colSpan="5">Direcciones</th>
            </tr>
            <tr>
              <th>id</th>
              <th>Dirección</th>
              <th>Comuna</th>
              <th>Región</th>
              <th>Costo envío</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>Dirección</td>
              <td>Comuna</td>
              <td>Región</td>
              <td>Costo envío</td>
            </tr>
            {address.map((address) => (
              <tr key={address.id}>
                <td>{address.id}</td>
                <td>{address.address}</td>
                <td>{address.commune_name}</td>
                <td>{address.region_name}</td>                
                <td>{address.delivery_price}</td>
              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Addresses;
