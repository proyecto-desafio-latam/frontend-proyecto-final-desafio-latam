import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const CardBook = ({book}) => {

    const {FormatCoin} = useBookContext()

    return (
            <div className="col pb-1 pb-lg-3 mb-4">
                <article className="card h-100 border-0 shadow-sm size">
                    <div className="position-relative">
                        <span className="badge bg-info position-absolute top-0 end-0 zindex-2 mt-3 ms-3">Categoría:{book.category.name}</span>
                        <img src={book.image}className="card-img-top card-image" alt="Image" />
                    </div>
                    <div className="card-body pb-3 card-book">
                        <h4 className=" mb-2 card-book-title">
                          <Link to={`/books/${book.id}`} >{book.title}</Link>
                        </h4>
                        <p className="fs-md mb-2 card-text prueba3 ">Autor/a: {book.author.name}</p>
                        <p className="fs-xl fw-semibold text-primary mb-0 card-text">{FormatCoin(book.price)}</p>
                    </div>
                </article>
            </div>
    )
}

export default CardBook