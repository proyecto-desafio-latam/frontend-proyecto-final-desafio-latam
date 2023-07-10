import { useState } from "react"
import CardBook from "../components/CardBook"
import Filters from "../components/Filters"

import { useUserContext } from "../context/UserContext"

const Books = () => {

    const { books } = useUserContext()
    const [filterCategory, setFilterCategory] = useState("all")
    const [sortCriteria, setSortCriteria] = useState('');

    return (
        <>
            <div className="container p-5 mt-5">
                <Filters setFilterCategory={setFilterCategory} setSortCriteria={setSortCriteria} />
                <div className="pt-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4  gx-3 gx-md-4 mt-n2 mt-sm-0">
                    {books
                        .filter((item) => item.category.id == filterCategory || filterCategory == "all")
                        .sort((a, b) => {
                            if (sortCriteria == "title-asc") {
                                return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                            } else if (sortCriteria == "title-desc") {
                                return b.title.toLowerCase().localeCompare(a.title.toLowerCase())
                            } else if (sortCriteria == "author-asc") {
                                return a.author.name.toLowerCase().localeCompare(b.author.name.toLowerCase())
                            } else if (sortCriteria == "author-desc") {
                                return b.author.name.toLowerCase().localeCompare(a.author.name.toLowerCase())
                            } else if (sortCriteria == "price-asc") {
                                return a.price - b.price;
                            } else if (sortCriteria == "price-desc") {
                                return b.price - a.price;
                            } else {
                                return books
                            }
                        })
                        .map((item) => (
                            <CardBook book={item} key={item.id} />
                        ))}
                </div>
            </div>
        </>
    )
}



export default Books