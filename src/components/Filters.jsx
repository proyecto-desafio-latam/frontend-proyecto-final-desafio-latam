import { useEffect, useState } from "react"
import { useUserContext } from "../context/UserContext"


const Filters = () => {
    const { books } = useUserContext()
    const [data, setData] = useState([])
    const [value, setValue] = useState("")
    const [selected, setSelected] = useState()
    const [category, setCategory] = useState([])
    const [author, setAuthor] = useState([])
    const [sortValue, setSortValue] = useState("");
    const sortOptions = ["title", "author", "price"];

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

    const getAuthors = async () => {
        try {
            const response = await fetch("/authors.json")
            if (!response.ok) throw "No se puede desplegar la información"
            const data = await response.json()
            setAuthor(data)
        } catch (error) {
            setError(error)
        }
    }

    useEffect(() => {
        getAuthors();
    }, [])


    return (
        <div className="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
            <h1 className="me-3">Catálogo de Libros</h1>
            <div className="d-md-flex d-xl-flex mb-3">
                <select className="form-select me-md-4 mb-2 mb-md-0" style={{ minWidth: '240px' }}  >
                    <option defaultValue disabled selected>Filtrar por</option>
                    <optgroup label="Categoría" >
                        {category.map((item) => (
                            <option value={item.name} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </optgroup>
                    <optgroup label="Autor">
                        {author.map((item) => (
                            <option value={item.name} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </optgroup>
                </select>

                <div className="position-relative" >
                    <select
                        className="form-select me-md-4 mb-2 mb-md-0"
                        style={{ minWidth: '240px' }}
                    >

                        <option defaultValue disabled selected>Ordenar por</option>
                        <option value="Título">Título: A - Z</option>
                        <option value="Título">Título: Z- A</option>
                        <option value="Autor">Autor: A - Z</option>
                        <option value="Autor">Autor: Z- A</option>
                        <option value="Precio">Precio: Menor a mayor</option>
                        <option value="Precio">Precio: Mayor a menor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filters