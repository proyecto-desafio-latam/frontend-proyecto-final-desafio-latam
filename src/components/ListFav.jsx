import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ListFav = () => {

  const { favorites } = useAuthContext()

  if (favorites.length === 0) {
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
                  return (
                    <tr key={item.favorite_id}>
                      <td><Link to={`/books/${item.book_id}`}>{item.book_id}</Link></td>
                      <td>{item.title}</td>
                      <td>{item.author.name}</td>
                      <td>{item.category.name}</td>
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
