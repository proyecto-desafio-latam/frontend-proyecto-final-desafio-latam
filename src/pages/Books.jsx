import { useEffect, useState } from "react"
import Paginate from 'react-paginate';
import { useBookContext } from "../context/BookContext"
import CardBook from "../components/CardBook"
import Filters from "../components/Filters"

const Books = () => {

    const { books } = useBookContext()
    const [filterCategory, setFilterCategory] = useState("all")
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortedBooks, setSortedBooks] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook)

    const setFilterAndResetPage = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
    }

    useEffect(() => {
        let applyFilters = books.filter((item) => item.category.id == filterCategory || filterCategory == "all")
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
        setSortedBooks(applyFilters)
    }, [books, filterCategory, sortCriteria])

    return (
        <>
            <div className="container p-5 mt-5">
                <Filters setFilterCategory={setFilterAndResetPage} setSortCriteria={setSortCriteria} />
                <div className="pt-4 row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4  gx-3 gx-md-4 mt-n2 mt-sm-0">
                    {currentBooks.map((item) => (
                        <CardBook book={item} key={item.id} />
                    ))}
                </div>
                <Paginate
                    breakLabel="..."
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    pageCount={Math.ceil(sortedBooks.length / booksPerPage)}
                    onPageChange={({ selected }) => {
                        setCurrentPage(selected + 1);
                        window.scrollTo(0, 0);
                    }}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageLinkClassName="page-num"
                    previousLinkClassName={Math.ceil(sortedBooks.length / booksPerPage) > 1 ? "page-num" : "hide-link"}
                    nextLinkClassName={Math.ceil(sortedBooks.length / booksPerPage) > 1 ? "page-num" : "hide-link"}
                />
            </div>
        </>
    )
}

export default Books