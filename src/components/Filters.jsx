import { useEffect, useState } from "react"

const Filters = ({ setFilterCategory, sortCriteria, setSortCriteria }) => {

    const [category, setCategory] = useState([])

    const handleSortChange = (e) => {
        let value = e.target.value;
        setSortCriteria(value);
    }

    const getCategories = async () => {
        try {
            const response = await fetch("/category.json")
            if (!response.ok) throw "No se puede desplegar la información"
            const data = await response.json()
            setCategory(data)
        } catch (error) {
            setError(error)
        }
    }
    useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
            <h1 className="me-3">Catálogo de Libros</h1>
            <div className="d-md-flex d-xl-flex mb-3">
                <select className="form-select me-md-4 mb-2 mb-md-0" style={{ minWidth: '240px' }} onChange={(e) => setFilterCategory(e.target.value)} >
                    <option value={"all"}>Todos</option>
                    <optgroup label="Categoría" >
                        {category.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </optgroup>
                </select>
                <div className="position-relative" >
                    <select
                        className="form-select me-md-4 mb-2 mb-md-0"
                        style={{ minWidth: '240px' }}
                        value={sortCriteria}
                        defaultValue={"placeholder"}
                        onChange={handleSortChange}
                    >
                        <option value={"placeholder"} disabled>Ordenar por</option>
                        <option value="title-asc">Título: A - Z</option>
                        <option value="title-desc">Título: Z- A</option>
                        <option value="author-asc">Autor: A - Z</option>
                        <option value="author-desc">Autor: Z- A</option>
                        <option value="price-asc">Precio: Menor a mayor</option>
                        <option value="price-desc">Precio: Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filters