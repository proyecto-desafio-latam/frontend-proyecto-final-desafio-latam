import { BiSolidHeart } from "react-icons/bi";
import ListFav from "../components/ListFav";

const Favorites = () => {

  return (
    <div className="container pb-5">
        <h2 className="text-center pt-3"> <BiSolidHeart style={{ color: 'red' }} /> Mis Libros Favoritos <BiSolidHeart style={{ color: 'red' }} /> </h2>
      <ListFav></ListFav>
    </div>
  );
};

export default Favorites;