import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";


export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
        </Routes>
      </main>
    </>
  );
}
