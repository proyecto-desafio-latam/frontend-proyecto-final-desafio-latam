import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Heart from "../components/Heart"
import { useBookContext } from "../context/BookContext"
import { useAuthContext } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"

const BookDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const { book, getBook, FormatCoin } = useBookContext()
    const { addToCart } = useCartContext()
    const { user, favorites, setFavorites, token } = useAuthContext()
    const [isFavorite, setIsFavorite] = useState();


    const addFavorite = async (bookId, access_token) => {
        const dataToSend = {
            "book_id": parseInt(bookId)
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/favorites`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })
            const data = await response.json()
            return data.result
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFavorite = async (bookId, access_token) => {
        const dataToSend = {
            "book_id": parseInt(bookId)
        };
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/favorites`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            })
            const data = await response.json()
            setIsFavorite(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const findFilled = favorites.find(findFilled => findFilled.book_id == id)
        if (findFilled) {
            setIsFavorite(true)
        }
    }, [favorites, id]);

    useEffect(() => {
        getBook(id)
    }, [])


    const handleFavoriteClick = async (item) => {
        setIsFavorite(!isFavorite);

        if (isFavorite) {
            setFavorites((prevState) => prevState.filter((favorite) => favorite.book_id !== item.id));

            try {
                await deleteFavorite(item.id, token);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const newFav = await addFavorite(item.id, token);
                const addFav = { "favorite_id": newFav.id, "book_id": item.id, "title": item.title, "author": item.author, "category": item.category }
                setIsFavorite(true)
                setFavorites((prevState) => [...prevState, addFav]);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // push the book into the cart
    const handleAddToCart = (bookDetailed) => {
        addToCart(bookDetailed)
    }

    if (book.length === 0) return (<div className="container mt-5 pt-5"  >
        <p className="text-center fs-md mt-5">El libro que buscas no existe, revisa el catálogo <Link to="/books">aquí</Link></p>
    </div>)

    return (
        <div className="container mt-5 p-5">
            < div className="card mb-3 mt-5" key={book.id}>
                <div className="row g-0">
                    <div className="col-md-4 position">
                        <div className="img-container">
                            <img src={book.image} className="img-fluid rounded-start h-100" alt="..." />
                            {user && <Heart className="icon" filled={isFavorite} onClick={() => handleFavoriteClick(book)} />}
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="fs-1">{book.title}</h5>
                            <p className="card-text"><b> Autor:</b> {book.author}</p>
                            <h4 className="card-text">
                                <b> {FormatCoin(book.price)}</b>
                            </h4>
                            <p>Stock Disponible: {book.stock}</p>
                            <div className="d-flex justify-content-end gap-3">
                                {user && <button onClick={() => handleAddToCart(book)} className="btn btn-sm btn-primary btn-font">Añadir 🛒</button>}
                                <button className="btn btn-sm btn-secondary btn-font" onClick={() => navigate("/books")}>Volver 📖</button>
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
                                <div className="accordion-collapse collapse show" id="q-1" data-bs-parent="#faq">
                                    <div className="accordion-body fs-sm pt-0">
                                        <p className="justify">
                                            {book.description}
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
                                        <p>{book.category}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BookDetail