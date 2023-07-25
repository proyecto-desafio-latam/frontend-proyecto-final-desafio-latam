import { BiSolidHeart } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import { useBookContext } from "../context/BookContext";

const ListFav = () => {

  const { favorites } = useAuthContext() 
  const { books } = useBookContext()

  return (
    <>
      <div className="m-5 pt-3 vh-50">
        <h2 className="text-center"> <BiSolidHeart style={{ color: 'red' }} /> Mis Libros Favoritos <BiSolidHeart style={{ color: 'red' }} /> </h2>
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
                 const book = books.find(book => book.id == item.favorite_id);
                  return (
                    <tr key={item.favorite_id}>
                      <td>{book.id}</td>
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
};

export default ListFav;
