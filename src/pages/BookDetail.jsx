import { useNavigate, useParams } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import Heart from "../components/Heart"
import { useState } from "react"

const BookDetail = () => {

    const { id } = useParams()
    const { books, FormatCoin } = useBookContext()
    const navigate = useNavigate()
    const [isFavorite, setIsFavorite] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        if (!isFavorite) {
            setFavorites([...favorites, id]);
        } else {
            setFavorites(favorites.filter((favorite) => favorite !== id));
        }
    };

    return (
        <div className="container mt-5 p-5">

            {books.filter(item => item.id == id)
                .map((item) => (
                    <div className="card mb-3 mt-5" key={item.id}>
                        <div className="row g-0">
                            <div className="col-md-4 position ">
                                <div className="img-container">
                                    <img src={item.image} className="img-fluid rounded-start h-100" alt="..." />
                                    {accessToken &&  <Heart className="icon" filled={isFavorite} onClick={handleFavoriteClick} />}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="fs-1">{item.title}</h5>
                                    <p className="card-text"><b> Autor:</b> {item.author.name}</p>
                                    <h4 className="card-text">
                                        <b> {FormatCoin(item.price)}</b>
                                    </h4>
                                    <p>Stock Disponible: {item.stock}</p>
                                    <div className="d-flex justify-content-end gap-3">
                                    {accessToken && <button className="btn btn-sm btn-primary btn-font"
                                        >Añadir 🛒</button>}
                                        <button className="btn btn-sm btn-secondary btn-font" onClick={() =>
                                            navigate("/books")
                                        }>Volver 📖</button>
                                    </div>
                                </div>
                                <div className="accordion" id="faq">
                                    <div className="accordion-item border-0 rounded-3 shadow-sm mb-3">
                                        <h3 className="accordion-header">
                                            <button
                                                className="accordion-button shadow-none rounded-3"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#q-1"
                                                aria-expanded="true"
                                                aria-controls="q-1"
                                            >
                                                Reseña
                                            </button>
                                        </h3>
                                        <div
                                            className="accordion-collapse collapse show"
                                            id="q-1"
                                            data-bs-parent="#faq"
                                        >
                                            <div className="accordion-body fs-sm pt-0">
                                                <p className="justify">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 rounded-3 shadow-sm mb-3">
                                        <h3 className="accordion-header">
                                            <button className="accordion-button shadow-none rounded-3 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#q-2" aria-expanded="false" aria-controls="q-2">Categoría</button>
                                        </h3>
                                        <div className="accordion-collapse collapse" id="q-2" data-bs-parent="#faq">
                                            <div className="accordion-body fs-sm pt-0">
                                                <p>{item.category.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default BookDetail