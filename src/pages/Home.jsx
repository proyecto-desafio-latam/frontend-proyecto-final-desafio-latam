import { BiBadgeCheck, BiRocket } from "react-icons/bi"
import Banners from "../components/Banners"
import BookCarousel from "../components/BookCarousel"
import { useUserContext } from "../context/UserContext"

const Home = () => {
    const { books } = useUserContext()
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center pt-5">Título</h1>
            <Banners />
            <div className="pt-5">
                <h3 className="mt-5"> <BiBadgeCheck style={{ color: 'red', fontSize: '50px' }} /> Los más vendidos </h3>
                <hr />
                <BookCarousel books={books.slice(45, 55)} color={`bg-danger`} />
            </div>
            <div className="pt-5">
                <h3 className="mt-5"> <BiRocket style={{ color: 'darkgreen', fontSize: '50px' }} /> No te pierdas </h3>
                <hr />
                <BookCarousel books={books.slice(24, 34)}  color={`bg-success`} />
            </div>
        </div>
    )
}

export default Home