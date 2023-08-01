import { BiSolidHeart } from "react-icons/bi";
import ListFav from "../components/ListFav";

const Favorites = () => {

  return (
    <div className="container pt-5 pb-5">
        <h2 className="text-center mt-5 pt-5"> <BiSolidHeart style={{ color: 'red' }} /> Mis Libros Favoritos <BiSolidHeart style={{ color: 'red' }} /> </h2>
      <ListFav></ListFav>
    </div>
  );
};

export default Favorites;