import { useEffect } from "react"
import { useState } from "react"

const FormAddress = ({address, setAddress}) => {
    const [region, setRegion] = useState("")
    const [commune, setCommune] = useState([])
    const [selectedCommune, setSelectedCommune] = useState("")
    const [addressLine, setAddressLine] = useState("")
    const [error, setError] = useState("")


    const getCommunes = async () => {
        try {
            const response = await fetch("/communes.json")
            if (!response.ok) throw "No se puede desplegar la información"
            const data = await response.json()
            setCommune(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCommunes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("")
        if (!addressLine.trim()) {
            return setError("Llena todos los campos");
        } 
        
        const newAddress = {
            region: "Región Metropolitana",
            commune: commune[selectedCommune].name,
            id: Math.random(),
            addressLine
        }

        const newAddresses = [...address, newAddress];
        setAddress(newAddresses);
    
        localStorage.setItem('Addresses', JSON.stringify(newAddresses));
        // console.log("1")
        // setAddress([...address, newAddress])
        // console.log("2")
        // console.log(address)
        setRegion("")
        setSelectedCommune("")
        setAddressLine("")

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mt-3">
                    <label className="form-label">Región</label>
                    <select name="" id="" style={{ minWidth: '400px' }} defaultValue={"placeholder"}>
                        <option  value={"placeholder"} disabled>Región</option>
                    <option onChange={(e) => setRegion(e.target.value)} value={region} type="text" className="form-control"> Región Metropolitana </option> 
                    </select>
                    
                </div>
                <div className="form-group mt-3">
                <label className="form-label">Comunas</label>
                    <select className="form-label" onChange={(e) => setSelectedCommune(e.target.value)} style={{ minWidth: '400px' }} defaultValue={"placeholder"}>
                    <option   value={"placeholder"} disabled>Elige tu comuna</option>
                        {commune.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                  
                    </select>
                   
                    {/* <input  type="text" value={commune} className="form-control" placeholder="Ingresa correo del colaborador" /> */}
                </div>
                <div className="form-group mt-3">
                    <label className="form-label">Dirección</label>
                    <input onChange={(e) => setAddressLine(e.target.value)} type="text" value={addressLine} className="form-control" placeholder="Ingresa direccion"/>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Agregar dirección</button>
                <p className=" mt-2">{error}</p>
            </form>
        </div>
    )
}

export default FormAddress;