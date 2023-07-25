import { Link } from "react-router-dom";
import { BiSolidHeart } from "react-icons/bi";
import { useAuthContext } from "../context/AuthContext";
import ListFav from "../components/ListFav";


const Favorites = () => {
  const { favorites } = useAuthContext()

  if (favorites.length === 0) return (
    <div className="container  m-5  vh-50">
      <h2 className="text-center pt-3"> <BiSolidHeart style={{ color: 'red' }} /> Mis Libros Favoritos <BiSolidHeart style={{ color: 'red' }} /> </h2>
      <div  >
        <p className="text-center fs-md mt-5">Aún no tienes favoritos, para poder agregarlos, accede al catálogo de libros <Link to="/books">aquí</Link></p>
      </div>
    </div>
  )


  return (
    <div className="container pb-5">
      <ListFav></ListFav>
    </div>
  );
};


export default Favorites;