import { Link } from "react-router-dom";

const Publication = () => {

    return (
        <div className="container mt-2 pb-5">
            <h2 className="text-center">Panel para agregar nuevo libro al catálogo</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Título
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ingrese el título del libro"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Imagen
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ingrese el link de la imagen del libro"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                    Descripción
                </label>
                <textarea
                    type="text"
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Ingrese una descripción para el libro a agregar"
                    rows={3}
                    defaultValue={""}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Precio
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ingrese el precio del libro"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">
                    Stock
                </label>
                <input
                    type="number"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Ingrese el stock del libro"
                />
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputGroupSelect01">
                    Categoría
                </label>
                <select className="form-select" id="inputGroupSelect01" defaultValue={"placeholder"}>
                    <option alue={"placeholder"} disabled>Elige una categoría</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>
                <p className="pt-2">¿No está la categoría que necesitas? Agrégala <Link to="/category">acá</Link></p>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="inputGroupSelect01">
                    Autor
                </label>
                <select className="form-select" id="inputGroupSelect01" defaultValue={"placeholder"}>
                    <option alue={"placeholder"} disabled>Elige un autor</option>
                    <option value={1}>One</option>
                    <option value={2}>Two</option>
                    <option value={3}>Three</option>
                </select>
                <p className="pt-2">¿No está el autor que necesitas? Agrégalo <Link to="/author">acá</Link></p>
            </div>
            <button  type="button" className="btn btn-outline-primary mt-3">Agregar libro</button>
        </div>
    )
}

export default Publication;