import { useNavigate, useParams } from "react-router-dom"
import { useBookContext } from "../context/BookContext"
import Heart from "../components/Heart"
import { useEffect, useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import { useCartContext } from "../context/CartContext"

const BookDetail = () => {

    const { id } = useParams()
    const { books, FormatCoin } = useBookContext()
    const { addToCart } = useCartContext()
    const navigate = useNavigate()
    const { user, favorites, setFavorites, token } = useAuthContext()
    const [isFavorite, setIsFavorite] = useState(favorites.includes(id));

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
            setIsFavorite(true)
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


    // useEffect(() => {

    //     if (isFavorite) {
    //         setFavorites((prevState) => {
    //             const newFavorites = [...prevState, id];
    //             // localStorage.setItem('favorites', JSON.stringify(newFavorites));
    //             addFavorite(id, token)
    //             return newFavorites;
    //         });
    //     } else {
    //         setFavorites((prevState) => {
    //             const newFavorites = prevState.filter((favorite) => favorite !== id);
    //             // localStorage.setItem('favorites', JSON.stringify(newFavorites));
    //             return newFavorites;
    //         });
    //     }
    //     if (favorites.find((fav) => fav == id)) {
    //         setIsFavorite(true);
    //     }
    // }, []);

    // [isFavorite, id]
    // const handleFavoriteClick = () => {
    //     if (isFavorite) {
    //         setFavorites()
    //         setIsFavorite(false);
    //     } else {
    //         setIsFavorite(true)
    //     }

    // };
    // useEffect(() => {
    //     if (!isFavorite) {
    //         setIsFavorite(favorites.includes(id));
    //     }
    // }, [favorites, id, isFavorite]);

    useEffect(() => {
        setIsFavorite(favorites.includes(id));
      }, [favorites, id]);
      

    const handleFavoriteClick = async (item) => {
        setIsFavorite(!isFavorite);

        if (isFavorite) {
            setFavorites((prevState) => prevState.filter((favorite) => favorite !== item.id));

            try {
                await deleteFavorite(item.id, token);
            } catch (error) {
                console.log(error);
            }
        } else {
            setFavorites((prevState) => [...prevState, item.id]);

            try {
                await addFavorite(item.id, token);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // push the book into the cart
    const handleAddToCart = (bookDetailed) => {
        addToCart(bookDetailed)
    }

    return (
        <div className="container mt-5 p-5">

            {books.filter(item => item.id == id)
                .map((item) => (
                    <div className="card mb-3 mt-5" key={item.id}>
                        <div className="row g-0">
                            <div className="col-md-4 position ">
                                <div className="img-container">
                                    <img src={item.image} className="img-fluid rounded-start h-100" alt="..." />
                                    {user && <Heart className="icon" filled={isFavorite} onClick={() => handleFavoriteClick(item)} />}
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
                                        {user && <button onClick={() => handleAddToCart(item)} className="btn btn-sm btn-primary btn-font"
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