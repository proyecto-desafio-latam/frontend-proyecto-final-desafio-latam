import { useEffect, useState } from "react"
import Paginate from 'react-paginate';
import CardBook from "../components/CardBook"
import Filters from "../components/Filters"

const Books = () => {
        
    const [filterCategory, setFilterCategory] = useState(0);
    const [sortedBooks, setSortedBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(12);
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    let currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);
 
    const setFilterAndResetPage = (category) => {
        setFilterCategory(category);
        setCurrentPage(1);
    }

    return (
        <>
            <div className="container p-5 mt-5">
                <Filters setFilterCategory={setFilterAndResetPage} filterCategory={filterCategory} setSortedBooks={setSortedBooks}/>
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

export default Books;