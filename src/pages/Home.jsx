import {  BiBadgeCheck} from "react-icons/bi"
import Banners from "../components/Banners"
import BookCarousel from "../components/BookCarousel"

const Home = () => {
    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center pt-5">Título</h1>
            <Banners />
            <div className="pt-5">
                <h3 className="mt-5"> <BiBadgeCheck style={{color: 'red', fontSize: '50px'}}/> Los más vendidos </h3>
                <hr/>
            </div>
            <BookCarousel />
        </div>
    )
}

export default Home