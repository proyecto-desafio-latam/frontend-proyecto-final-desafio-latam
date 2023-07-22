import React, { useState, useEffect } from 'react';


import { useCartContext } from '../context/CartContext';


const Cart = () => {

    const { cart, setCart, deleteFromCart } = useCartContext();

    //Funcion que borra un tipo de libro del carrito
    const handleDeleteFromCart = (idBook) => {
        deleteFromCart(idBook);
    }

    //Función que incrementa un tipo de libro en el carrito
    const handleIncrementBook = (idBook) => {
        const newCart = cart.map((item) => item.bookProduct.id === idBook ?
            { ...item, quantity: item.quantity + 1 } : item);
        setCart(newCart);
    };

    //Función que decrementa un tipo de libro en el carrito
    const handleDecrementBook = (idBook) => {
        const newCart = cart.map((item) => {
            if (item.bookProduct.id === idBook && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(newCart);
    };

    //Función que calcula el total 
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
            <main className="cart-container">
                <div className='title-container'>
                    <h2>Carro 🛒</h2>
                </div>
                <hr />
                <div className="table">
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
            <aside className="favorites-container">
                <div className='title-container'>
                    <h2>Favoritos ❤️</h2>
                </div>
                <hr />
            </aside>

        </div>

    );
};
export default Cart;