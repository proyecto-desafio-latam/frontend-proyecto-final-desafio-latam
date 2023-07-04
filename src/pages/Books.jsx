import CardBook from "../components/cardBook"
import { useUserContext } from "../context/UserContext"

const Books = () => {

    const { books } = useUserContext()

    return (
        <>
            <div className="container p-5 mt-5">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 gx-3 gx-md-4 mt-n2 mt-sm-0">
                    {books.map((item) => (
                        <CardBook book={item} key={item.id} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Books