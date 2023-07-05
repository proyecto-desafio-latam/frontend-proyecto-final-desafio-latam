import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </main>
    </>
  );
}
