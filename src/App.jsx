import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Books from "./pages/Books";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import User from "./pages/User";
import About from "./pages/About";
import Addresses from "./pages/Addresses";


export default function App() {

  const {user} = useAuthContext()
  if (user === null) return <div>Loading...</div>;

  return (
    <>
      <Navbar></Navbar>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={ user ? <User/> : <Navigate to="/login"/>} />
          <Route path="/user/favorites" element={user ? <Favorites /> : <Navigate to="/login" />} />
          <Route path="/user/addresses" element={user ? <Addresses /> : <Navigate to="/login"/>} />
        </Routes>
      </main>
      <Footer></Footer>
    </>
  );
}
