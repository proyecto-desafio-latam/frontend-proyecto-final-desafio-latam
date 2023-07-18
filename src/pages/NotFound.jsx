import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="container mt-5 p-5" >
            <h2 className="text-center mt-5">La página que buscas no existe</h2>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={() =>
                    navigate("/")
                }>Volver al sitio</button>
            </div>
        </div>
)}

export default NotFound;