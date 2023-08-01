import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/style.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from "./App.jsx";
import BookContextProvider from "./context/BookContext";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import AddressesContextProvider from "./context/AddressesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <BookContextProvider>
              <AddressesContextProvider>
                <App />
              </AddressesContextProvider>
          </BookContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
    <ToastContainer                      
      position="bottom-right"
      autoClose={1000}
      theme="colored" />
  </React.StrictMode>
);
