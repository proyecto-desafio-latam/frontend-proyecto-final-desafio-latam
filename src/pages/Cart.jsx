import '../assets/css/Cart.css'
import React, { useState, useEffect } from 'react';

import { useUserContext } from '../context/UserContext';
import { useCartContext } from '../context/CartContext';

const Cart = () => {


    // const { books } = useUserContext();


    const { cart, setCart, deleteFromCart } = useCartContext();
    console.log(cart)
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

    const totalPurchase = totalPurchaseCalculate();

    // useEffect(() => {
    //   first
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    

    return (


        <div className='cart-favorites-wrapper'>
            {/* cart */}
            <main class="cart-container">
                <div className='title-container'>
                    <h2>Carro 🛒</h2>
                </div>
                <hr />
                <div class="table">
                    {/* <div className='product-container'>
                        <div className='description-container'>img product</div>
                        <div className='description-container'>Nombre Producto</div>
                        <div className='description-container'>Precio</div>
                        <div className='description-container'>
                            <button class="count-button minus">-</button>
                            <span>1</span>
                            <button class="count-button plus">+</button>
                        </div>
                        <div className='description-container'>
                            <button class="delete-button">
                                Eliminar
                            </button>
                        </div>
                    </div> */}
                    {
                        cart.map((book) => (
                            <div className='table row'>
                                <div className='id-img'><img className='img-product' src={book.bookProduct.image} alt="" />{ }</div>
                                <div className='name-product '>{book.bookProduct.title}</div>
                                <div className='price-total'>{`$${book.bookProduct.price * book.quantity}`}</div>
                                <div className='quantity-selector'>
                                    <button onClick={() => handleDecrementBook(book.bookProduct.id)} class="count-button minus">-</button>
                                    <span>{book.quantity}</span>
                                    <button onClick={() => handleIncrementBook(book.bookProduct.id)} class="count-button plus">+</button>
                                </div>
                                <div className='id-img'>
                                    <button onClick={() => handleDeleteFromCart(book.bookProduct.id)} class="delete-button">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* pago */}
                <div className='total-cart'>
                    <div className='total-container'>
                        <button className='payment-button'>Pagar</button>
                    </div>
                    <div className='total-container'>
                        <div className='total-container-title'>Total</div>
                        <div className='total-container-price'>${totalPurchase}</div>
                    </div>
                </div>


            </main>
            {/* favorites */}
            <aside class="favorites-container">
                <div className='title-container'>
                    <h2>Favoritos ❤️</h2>
                </div>
                <hr />
            </aside>


            {/* <div className="cart">
                <h2>Carro</h2>
                <button onClick={addToCart}>Agregar al carrito</button>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Contador</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.count}</td>
                                <td>
                                    <button onClick={() => incrementCount(index)}>+</button>
                                    <button onClick={() => decrementCount(index)}>-</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="favorites"></div> */}
        </div>

    );
};

export default Cart;
