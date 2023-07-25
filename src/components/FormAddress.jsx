import { useEffect, useState } from "react";

const FormAddress = ({ address, setAddress }) => {
  const [commune, setCommune] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [error, setError] = useState("");
  const [regiones, setRegiones] = useState([]);

  const getLocations = async () => {
    const response = await fetch(import.meta.env.VITE_BASE_URL + "/addresses");
    const data = await response.json();
    setRegiones(data.result);
  };

  useEffect(() => {
    getLocations();
    // getCommunes();
  }, []);

  const handleRegionChange = (event) => {
    const selectedRegionId = event.target.value;
    const selectedRegion = regiones.find(
      (region) => region.region_id === parseInt(selectedRegionId)
    );
    setSelectedRegion(selectedRegion);
  };

  const handleCommuneChange = (event) => {
    const selectedCommuneId = event.target.value;
    setSelectedCommune(selectedCommuneId);
  };
  const postData = async () => {
    try {
      const requestBody = {
        communeId: selectedCommune, // Utiliza el ID de la comuna seleccionada
        addressLine: addressLine,
        // userId: userId, // Asume que tienes el ID del usuario disponible en alguna variable llamada "userId"
      };
     /*  console.log("Request Body:", requestBody); */

      const response = await fetch(import.meta.env.VITE_BASE_URL+"/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${token}`// Aquí podrías incluir un token de autenticación si es necesario
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      // Obtener el nombre de la comuna seleccionada
      const selectedCommuneName =
        commune.find((commune) => commune.id === selectedCommune)?.name || "";

      const newAddress = {
        region: selectedRegion ? selectedRegion.region_name : "",
        commune: selectedCommuneName,
        id: Math.random(),
        addressLine,
      };

      const updatedAddresses = [...address, newAddress];
      localStorage.setItem("Addresses", JSON.stringify(updatedAddresses));

      // Limpiar los campos después del envío
      setSelectedRegion(null);
      setSelectedCommune(null);
      setAddressLine("");

      // Aquí puedes hacer algo con la respuesta del servidor si es necesario
      // Por ejemplo, mostrar un mensaje de éxito o actualizar el estado del componente
    } catch (error) {
      console.log(error);
      // Manejar errores si es necesario
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!addressLine.trim() || selectedCommune === null) {
      // Verifica que se haya seleccionado una comuna válida
      setError("Llena todos los campos");
      return;
    }

    const newAddress = {
      region: selectedRegion ? selectedRegion.region_name : "",
      commune: selectedCommune ? selectedCommune : "", // Utiliza el ID de la comuna seleccionada
      id: Math.random(),
      addressLine,
    };

    setAddress((prevAddresses) => [...prevAddresses, newAddress]);

    // Aquí puedes hacer lo que necesites con la información antes de enviarla al servidor
    postData();

    // Limpiar los campos después del envío
    setSelectedRegion(null);
    setSelectedCommune(null);
    setAddressLine("");
  };

  const createNewAddress = () => {
    // Obtener el objeto de la comuna seleccionada
    const selectedCommuneObj =
    selectedRegion.commune.find((commune) => commune.id === selectedCommune) || {};

    // Obtener el nombre de la comuna seleccionada
    const selectedCommuneName = selectedCommuneObj.name || "";

    const newAddress = {
      commune: selectedCommuneName,
      communeId: selectedCommune,
      region: selectedRegion.region_name,
      regionId: selectedRegion.region_id,
      addressLine,
    };

    return newAddress;
  };

 /*  const newAddress = createNewAddress(); */
 /*  console.log(newAddress); */

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-3">
          <label className="form-label">Región</label>
          <select
            onChange={handleRegionChange}
            defaultValue={"placeholder"}
            className="selectAddress"
          >
            <option value={"placeholder"} disabled>
              Región
            </option>
            {regiones.map((region) => (
              <option
                key={region.region_id}
                value={region.region_id}
                className="form-control"
              >
                {region.region_name}
              </option>
            ))}
          </select>
        </div>
        {console.log(selectedRegion)};
        <div className="form-group mt-3">
          <label className="form-label">Comunas</label>
          {selectedRegion && (
            <select
              className="form-label selectAddress"
              onChange={handleCommuneChange}
              value={selectedCommune} // Establece el valor seleccionado en el select de comunas
            >
              {selectedRegion.communes
                .sort((a, b) => {
                  if (a.name < b.name) {
                    return -1;
                  }
                })
                .map((commune) => (
                  <option
                    key={commune.id}
                    value={commune.id} // Utiliza el ID de la comuna como valor de la opción
                    className="form-control"
                  >
                    {commune.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        <div className="form-group mt-3">
          <label className="form-label">Dirección</label>
          <input
            onChange={(e) => setAddressLine(e.target.value)}
            type="text"
            value={addressLine}
            className="form-control selectAddress"
            placeholder="Ingresa direccion"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Agregar dirección
        </button>
        <p className=" mt-2">{error}</p>
      </form>
    </div>
  );
};

export default FormAddress;
