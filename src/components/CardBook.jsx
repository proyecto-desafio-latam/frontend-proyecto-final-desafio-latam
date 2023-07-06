import { useNavigate } from "react-router"

const CardBook = ({book}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/books/${book.id}`);
      };
    

    return (
            <div className="col pb-1 pb-lg-3 mb-4">
                <article className="card h-100 border-0 shadow-sm">
                    <div className="position-relative">
                        <span className="badge bg-info position-absolute top-0 start-0 zindex-2 mt-3 ms-3">Categoría: {book.category}</span>
                        <img src="/libroprueba.webp" className="card-img-top" alt="Image" />
                    </div>
                    <div className="card-body pb-3">
                        <h4 className=" mb-2">
                            <a href=""  onClick={handleClick}>{book.title}</a>
                        </h4>
                        <p className="fs-md mb-2">Autor/a: {book.author}</p>
                        <p className="fs-xl fw-semibold text-primary mb-0">${book.price}</p>
                    </div>
                </article>
            </div>
    )
}

export default CardBook