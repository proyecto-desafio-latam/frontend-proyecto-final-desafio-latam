import { useEffect, useState } from "react"
import { BiBadgeCheck, BiRocket } from "react-icons/bi"
import { TbWorldHeart } from "react-icons/tb"
import Banners from "../components/Banners"
import BookCarousel from "../components/BookCarousel"

const Home = () => {
    const [latestBooks, setLatestBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);


    useEffect(() => {
        const fetchLatestBooks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}books/latest`);
                const data = await response.json();
                setLatestBooks(data.result);
            } catch (error) {
                console.error("Error fetching latest books:", error);
            }
        };

        const fetchPopularBooks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}books/popular`);
                const data = await response.json();
                setPopularBooks(data.result);
            } catch (error) {
                console.error("Error fetching popular books:", error);
            }
        };
        fetchLatestBooks();
        fetchPopularBooks();
    }, []);


    return (
        <div className="container mt-5 pt-5">
            <h1 className="text-center pt-5"><TbWorldHeart style={{ color: "brown", fontSize: '50px' }} /> Mundo Libros</h1>
            <Banners />
            <div className="pt-5">
                <h3 className="mt-5"> <BiBadgeCheck style={{ color: 'red', fontSize: '50px' }} /> Los más vendidos </h3>
                <hr />
                <BookCarousel books={popularBooks} color={`bg-danger`} />
            </div>
            <div className="pt-3 pb-5 mb-5">
                <h3 className="mt-5"> <BiRocket style={{ color: 'darkgreen', fontSize: '50px' }} /> No te pierdas </h3>
                <hr />
                <BookCarousel books={latestBooks} color={`bg-success`} />
            </div>
        </div>
    )
}

export default Home