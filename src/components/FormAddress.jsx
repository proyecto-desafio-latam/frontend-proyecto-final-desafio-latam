import { useEffect, useState } from "react";
import { useAuthContext } from '../context/AuthContext';
import { useAddressesContext } from "../context/AddressesContext";


const FormAddress = () => {

  const [selectedRegion, setSelectedRegion] = useState({});
  const [selectedCommune, setSelectedCommune] = useState({});
  const [regions, setRegions] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [addressLine, setAddressLine] = useState("");
  const [error, setError] = useState("");

  const { user } = useAuthContext();
  const { getAddresses  } = useAddressesContext()

  const getLocations = async () => {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/addresses");
    const data = await response.json();
    const availableRegions = data.result;
    setRegions(availableRegions);
  };

  useEffect(() => {
    getLocations();
  }, [selectedCommune])


  const handleRegionChange = (e) => {
    const selectedRegionName = e.target.value;
    setSelectedRegion({ name: selectedRegionName, id: null });

    // Buscar región seleccionada en el arreglo avaibleRegions
    const selectedRegionData = regions.find((region) => region.region_name === selectedRegionName); //intercambio de availableRegions por regions
    // Actualizar el estado de las comunas disponibles según la región seleccionada
    if (selectedRegionData && selectedRegionData.communes) {
      setCommunes(selectedRegionData.communes);
      setSelectedCommune({}); // Reinicia la comuna selecionada
    } else {
      setCommunes([]);
      setSelectedCommune({});
    }

  };

  const handleCommuneChange = (event) => {
    const selectedCommuneName = event.target.value;
    setSelectedCommune({
      name: selectedCommuneName,
      id: communes.find((comuna) => comuna.name === selectedCommuneName)?.id,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    // Obtener el id de la comuna seleccionada
    const selectedCommuneId = selectedCommune.id;

    // Verificar si el id es un número válido
    const communeId = typeof selectedCommuneId === "number" ? selectedCommuneId : null;
    console.log(communeId);

    // Obtener la dirección ingresada en el input
    const address = addressLine;

    // Verificar que todos los datos requeridos estén disponibles
    if (!selectedCommuneId || !address) {
      console.error("Faltan datos requeridos para la solicitud POST");
      return;
    } else {
      const newAddress = {
        address: addressLine,
        commune_name: selectedCommune ? selectedCommune : "", // Utiliza el ID de la comuna seleccionada
        id: Date.now(),
        region_name: selectedRegion ? selectedRegion.region_name : "",
      };
      console.log(newAddress);
    }

    // Datos listos para enviar en la solicitud POST
    const data = {
      address: address,
      commune_id: Number(selectedCommuneId),
      user_id: user.id
    };

    fetch(`${import.meta.env.VITE_BASE_URL}user/${user.id}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
     
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud POST");
        }
        getAddresses()
        return response.json();
      })
      .then((responseData) => {
        console.log("Solicitud POST exitosa:", responseData);
      })
      .catch((error) => {
        console.error("Error en la solicitud POST:", error);
      });
  };

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label className="form-label">Región</label>
          <select className="form-select" value={selectedRegion.name || ""} onChange={handleRegionChange}>
            <option value="" disabled>Región</option>
            {regions.map((region) => (
              <option key={region.region_id} value={region.region_name}>{region.region_name}</option>
            ))}
          </select>
        </div>

        {selectedRegion.name && (
          <>
            <div className="form-group mt-3">
              <label className="form-label">Comunas</label>
              <select className="form-select" value={selectedCommune.name || ""} onChange={handleCommuneChange}>
                <option value="">Seleccione una comuna</option>
                {communes.map((comuna) => (
                  <option key={comuna.id} value={comuna.name}>
                    {comuna.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedCommune.name && (
              <>
                <div className="form-group mt-3">
                  <label className="form-label">Dirección</label>
                  <input
                    onChange={(e) => setAddressLine(e.target.value)}
                    type="text"
                    value={addressLine}
                    className="form-control select-address"
                    placeholder="Vicuña Mackena 4945"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Agregar dirección
                </button>
                <p className=" mt-2">{error}</p>
              </>
            )}

          </>
        )}
      </form>
    </div>

  );
}

export default FormAddress;

