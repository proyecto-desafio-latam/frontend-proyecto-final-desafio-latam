import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useBookContext } from "../context/BookContext";

const ListFav = () => {

  const { favorites } = useAuthContext()
  console.log("listafav")
  console.log(favorites)
  const { books } = useBookContext()

  if (favorites.length === 0 || books.length === 0) {
    return (
      <div  >
        <p className="text-center fs-md mt-5">Aún no tienes favoritos, para poder agregarlos, accede al catálogo de libros <Link to="/books">aquí</Link></p>
      </div>
    )

  } else {
    return (
      <>
        <div className="m-5 pt-3 mt-1">
          <div className="container-fluid border-none d-flex mt-5 pb-5 mb-5 ">
            <table className="align-items-between p-3 w-100 ">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Categoría</th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((item) => {
                  const book = books.find(book => book.id == item.book_id);

                  return (
                    <tr key={item.favorite_id}>
                      <td><Link to={`/books/${book.id}`}>{book.id}</Link></td>
                      <td>{book.title}</td>
                      <td>{book.author.name}</td>
                      <td>{book.category.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );


  }


};

export default ListFav;
