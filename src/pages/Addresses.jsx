import { useEffect, useState } from "react";
import { Zoom, toast } from "react-toastify"
import FormAddress from "../components/FormAddress";
import { useAddressesContext } from "../context/AddressesContext";
import { useBookContext } from "../context/BookContext";

const Addresses = () => {
  const [address, setAddress] = useState([]);
  const { userAddresses, setUserAddresses } = useAddressesContext();
  const { FormatCoin } = useBookContext()


  const handleDelete = async (elementId) => {
    try {
        const response = await fetch(import.meta.env.VITE_BASE_URL + `user/addresses/${elementId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUserAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== elementId));
        toast.info("Dirrección borrada exitosamente", { position: toast.POSITION.TOP_CENTER, transition: Zoom, autoClose:2000 })
      } else {
        toast.warning("No puedes borrar esta dirección, porque tienes compras asociadas", { position: toast.POSITION.TOP_CENTER, transition: Zoom })
        console.error('Error al eliminar el elemento:', response.status);
      }
    } catch (error) {
      console.error('Error al eliminar el elemento:', error);
    }
  };

  useEffect(() => {
    setUserAddresses(userAddresses);
  }, [userAddresses, setUserAddresses]);

 
  return (
    <div className="container mt-5 pt-5 pb-5 mb-5">
      <h2 className="text-center pt-5">Mis direcciones</h2>
      <p className="text-center">Ingresa tu dirección para tus compras:</p>
      <div className="container">
        {/* <FormAddress setAddress={setAddress} address={address} /> */}
        <FormAddress setAddress={setAddress} address={address} />
      </div>

      <div className="container p-4 mt-5">
        <hr />
        <h5 className="mt-3">Listado de direcciones🧭</h5>
        <table>
          <thead>
            <tr>
              <th colSpan="5">Direcciones</th>
            </tr>
            <tr>
              <th>Dirección</th>
              <th>Comuna</th>
              <th>Región</th>
              <th>Costo envío</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {userAddresses.map((address) => (
              <tr key={address.id}>
                <td>{address.address}</td>
                <td>{address.commune_name}</td>
                <td>{address.region_name}</td>
                <td>{FormatCoin(Number(address.delivery_price))}</td>
                <td><button className="btn btn-primary mt-4" onClick={() => handleDelete(address.id)}>Quitar</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Addresses;
