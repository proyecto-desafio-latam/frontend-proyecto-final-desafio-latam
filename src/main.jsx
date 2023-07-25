import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import "./assets/css/style.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import BookContextProvider from "./context/BookContext";
import AuthContextProvider from "./context/AuthContext";
import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";
import AddressesContextProvider from "./context/AddressesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <BookContextProvider>
            <UserContextProvider>
              <AddressesContextProvider>
                <App />
              </AddressesContextProvider>
            </UserContextProvider>
          </BookContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
