import { useEffect, useState } from "react"

const Filters = ({ filterCategory, setFilterCategory, setSortedBooks }) => {

    const [sort, setSort] = useState("");
    const [category, setCategory] = useState([]);

    const sortCriteria = [
        { name: "Título: A - Z", value: "sort[title]=asc" },
        { name: "Título: Z- A", value: "sort[title]=desc" },
        { name: "Autor: A - Z", value: "sort[authors.name]=asc" },
        { name: "Autor: A - Z", value: "sort[authors.name]=desc" },
        { name: "Precio: Menor a mayor", value: "sort[price]=asc" },
        { name: "Precio: Mayor a menor", value: "sort[price]=desc" }
    ];

    const getCategories = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}categories`);
            if (!response.ok) throw "No se puede desplegar la información";
            const data = await response.json();
            setCategory(data.result);
        } catch (error) {
            console.log("Error en la solicitud:", error);
        }
    };

    const handleSort = async (e) => {
        let value = e.target.value;
        try {
            setSort(value)
        } catch (error) {
            console.log(error)
        }
    };

    const handleFilterCategory = async (e) => {
        try {
            setFilterCategory(e)
        } catch (error) {
            console.log(error)
        }
    };

    const filterBooks = async () => {
        try {
            let filtersArray = []
            let baseURL = `${import.meta.env.VITE_BASE_URL}books?`
            if (filterCategory != 0) {
                filtersArray.push(`category_id=${filterCategory}`)
            }
            if (sort !== "") {
                filtersArray.push(sort)
            }
            const filters = filtersArray.join("&")
            const response = await fetch(`${baseURL}${filters}`)
            if (!response.ok) throw "No se puede desplegar la información";
            const data = await response.json()
            setSortedBooks(data.result)
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getCategories();
        filterBooks()
    }, [])


    useEffect(() => {
        if (sort !== "" || filterCategory !== 0) {
            filterBooks()
        }
    }, [sort, filterCategory])

    return (
        <div className="d-lg-flex align-items-center justify-content-between py-4 mt-lg-2">
            <h1 className="me-3">Catálogo de Libros</h1>
            <div className="d-md-flex d-xl-flex mb-3">
                <select className="form-select me-md-4 mb-2 mb-md-0" style={{ minWidth: '240px' }} onChange={(e) => handleFilterCategory(e.target.value)} >
                    <option value={0}>Todas las categorías</option>
                    {category.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <div className="position-relative" >
                    <select
                        className="form-select me-md-4 mb-2 mb-md-0"
                        style={{ minWidth: '240px' }}
                        defaultValue={"placeholder"}
                        onChange={handleSort}

                    >
                        <option value={"placeholder"} disabled>Ordenar por</option>
                        {sortCriteria.map((item) => (
                            <option value={item.value} key={item.value}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Filters;