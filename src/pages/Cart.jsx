
// import '../assets/sass/_cart.scss';
import '../assets/sass/Cart.css';
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';


import { useCartContext } from '../context/CartContext';

const Cart = () => {

    const { favorites } = useAuthContext();
    const { books } = useBookContext();
    const { cart, setCart, deleteFromCart, addToCart } = useCartContext();


    const handleDeleteFromCart = (idBook) => {
        deleteFromCart(idBook);
    }

    const handleIncrementBook = (idBook) => {
        const newCart = cart.map((item) => item.bookProduct.id === idBook ?
            { ...item, quantity: item.quantity + 1 } : item);
        setCart(newCart);
    };

    const handleDecrementBook = (idBook) => {
        const newCart = cart.map((item) => {
            if (item.bookProduct.id === idBook && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(newCart);
    };

    const totalPurchaseCalculate = () => {
        let total = 0;
        cart.forEach((item) => {
            const { bookProduct, quantity } = item;
            const priceBook = bookProduct.price;
            total += priceBook * quantity;
        })
        return total;
    }

    const handleAddToCart = (bookDetailed) => {
        addToCart(bookDetailed)
    }

    const totalPurchase = totalPurchaseCalculate();

    return (


        <>
            <td className='general-container'>
                <h2 className='carrito-title'>Carrito 🛒</h2>
                <table>
                    <thead>
                        <tr>
                            <th>IMG</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Unitario</th>
                            <th>Total</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((book) => (
                            <tr key={book.bookProduct.id}>
                                <td><img className='img-product' src={book.bookProduct.image} alt="" /></td>
                                <td>{book.bookProduct.title}</td>
                                <td><button onClick={() => handleDecrementBook(book.bookProduct.id)} className="count-button minus">-</button>
                                    <span>{book.quantity}</span>
                                    <button onClick={() => handleIncrementBook(book.bookProduct.id)} className="count-button plus">+</button></td>
                                <td>${book.bookProduct.price}</td>
                                <td>{`$${book.bookProduct.price * book.quantity}`}</td>
                                <td>
                                    <button className="eliminar-button" onClick={() => handleDeleteFromCart(book.bookProduct.id)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            {/* <!-- Celda para el total de ventas --> */}
                            <td colSpan="4"><strong>Total de Ventas:</strong></td>
                            <td colSpan="1"><strong>${totalPurchase}</strong></td>
                            {/* <!-- Celda para el botón de pagar --> */}
                            <td colSpan="1" data-label="Acciones">
                                <button className="pagar-button">Pagar</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <br />
                <h2>Direcciones🧭</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Direcciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>


                    </tbody>
                </table>
                <br />
                <h2>Favoritos❤️</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Autor</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Agregar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorites.map((id) => {
                            const book = books.find(book => book.id == id);
                            return (
                                <tr key={id} td className='favorites-header'>
                                    <td className='id-author'>{book.author.name}</td>
                                    <td className='id-name'>{book.title}</td>
                                    <td className='id-category'>{book.category.name}</td>
                                    <td><button onClick={() => handleAddToCart(book)} className='agregar-button'>Agregar a carrito
                                    </button></td>
                                </tr>
                            );
                        })}


                    </tbody>
                </table>
            </td>
        </>




        // <>
        //     <td className="general-container">
        //         <td className="">
        //             <td className='row'>
        //                 <td className='col'>
        //                     <table className="table">
        //                         {/* <caption>Carro 🛒</caption> */}
        //                         <thead className="text-center">
        //                             <tr>
        //                                 <th scope="col">IMG</th>
        //                                 <th scope="col">Nombre</th>
        //                                 <th scope="col">Cantidad</th>
        //                                 <th scope="col">Unitario</th>
        //                                 <th scope="col">Total</th>
        //                                 <th scope="col">Eliminar</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                         {cart.map((book) => (
        //                         <tr key={book.bookProduct.id}>
        //                             <td><img className='img-product' src={book.bookProduct.image} alt="" /></td>
        //                             <td>{book.bookProduct.title}</td>
        //                             <td><button onClick={() => handleDecrementBook(book.bookProduct.id)} className="count-button minus">-</button>
        //                                 <span>{book.quantity}</span>
        //                                 <button onClick={() => handleIncrementBook(book.bookProduct.id)} className="count-button plus">+</button></td>
        //                             <td>${book.bookProduct.price}</td>
        //                             <td>{`$${book.bookProduct.price * book.quantity}`}</td>
        //                             <td><button className="remove-item" onClick={() => handleDeleteFromCart(book.bookProduct.id)} >
        //                                 Eliminar
        //                             </button></td>
        //                         </tr>
        //                     ))}
        //                     <tfoot>

        //                     </tfoot>
        //                         </tbody>

        //                         {/* <tbody>
        //                     {cart.map((book) => (
        //                         <tr key={book.bookProduct.id}>
        //                             <td><img className='img-product' src={book.bookProduct.image} alt="" /></td>
        //                             <td>{book.bookProduct.title}</td>
        //                             <td><button onClick={() => handleDecrementBook(book.bookProduct.id)} className="count-button minus">-</button>
        //                                 <span>{book.quantity}</span>
        //                                 <button onClick={() => handleIncrementBook(book.bookProduct.id)} className="count-button plus">+</button></td>
        //                             <td>${book.bookProduct.price}</td>
        //                             <td>{`$${book.bookProduct.price * book.quantity}`}</td>
        //                             <td><button className="remove-item" onClick={() => handleDeleteFromCart(book.bookProduct.id)} >
        //                                 Eliminar
        //                             </button></td>
        //                         </tr>
        //                     ))}
        //                     <tfoot>

        //                     </tfoot>
        //                 </tbody> */}
        //                     </table>
        //                 </td>
        //             </td>


        //         </td>
        //     </td>




        // </>
        //     <td className='cart-favorites-wrapper'>
        //         {/* cart */}
        //         <main className="cart-container">
        //             <td className='title-container'>
        //                 <h2>Carro 🛒</h2>
        //             </td>
        //             <hr />
        //             <td className="table">
        //                 {
        //                     cart.map((book) => (
        //                         <td key={book.bookProduct.id} className='table row'>
        //                             <td className='id-img'><img className='img-product' src={book.bookProduct.image} alt="" /></td>
        //                             <td className='name-product '>{book.bookProduct.title}</td>
        //                             <td className='price-total'>{`$${book.bookProduct.price * book.quantity}`}</td>
        //                             <td className='quantity-selector'>
        //                                 <button onClick={() => handleDecrementBook(book.bookProduct.id)} className="count-button minus">-</button>
        //                                 <span>{book.quantity}</span>
        //                                 <button onClick={() => handleIncrementBook(book.bookProduct.id)} className="count-button plus">+</button>
        //                             </td>
        //                             <td className='delete-product'>
        //                                 <button className="remove-item" onClick={() => handleDeleteFromCart(book.bookProduct.id)} >
        //                                     Eliminar
        //                                 </button>
        //                             </td>
        //                         </td>
        //                     ))
        //                 }
        //             </td>

        //             {/* pago */}
        //             <td className='total-cart'>
        //                 <td className='total-container'>
        //                     <button className='payment-button'>Pagar</button>
        //                 </td>
        //                 <td className='total-container'>
        //                     <td className='total-container-title'>Total</td>
        //                     <td className='total-container-price'>${totalPurchase}</td>
        //                 </td>
        //             </td>
        //         </main>

        //         {/* favorites */}
        //         <td className='cart-address-container'>
        //         <aside className="favorites-container">
        //             <td className='title-container'>
        //                 <h2>Favoritos ❤️</h2>
        //             </td>
        //             <hr />
        //             <td className="table">
        //                 <td className='favorites-header'>

        //                     <td className='id-name'><p><b>Nombre</b></p></td>
        //                     <td className='id-author'><p><b>Autor</b></p></td>
        //                     <td className='id-category'><p><b>Categoría</b></p></td>
        //                 </td>
        //                 {favorites.map((id) => {
        //                     const book = books.find(book => book.id == id);
        //                     return (
        //                         <td key={id} td className='favorites-header'>

        //                             <td className='id-name'>{book.title}</td>
        //                             <td className='id-author'>{book.author.name}</td>
        //                             <td className='id-category'>{book.category.name}</td>
        //                         </td>
        //                     );
        //                 })}
        //             </td>
        //         </aside>
        //         </td>


        //     </td>

    );
};

export default Cart;