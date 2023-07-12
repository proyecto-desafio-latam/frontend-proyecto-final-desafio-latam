import '../assets/css/Cart.css'
import React, { useState } from 'react';

const Cart = () => {
    // const [products, setProducts] = useState([]);

    // const incrementCount = (index) => {
    //     const updatedProducts = [...products];
    //     updatedProducts[index].count += 1;
    //     setProducts(updatedProducts);
    // };

    // const decrementCount = (index) => {
    //     const updatedProducts = [...products];
    //     if (updatedProducts[index].count > 0) {
    //         updatedProducts[index].count -= 1;
    //     }
    //     setProducts(updatedProducts);
    // };

    // const addToCart = () => {
    //     const newProduct = {
    //         name: `Product ${products.length + 1}`,
    //         count: 0,
    //     };
    //     setProducts([...products, newProduct]);
    // };

    return (


        <div className='cart-favorites-wrapper'>
            {/* cart */}
            <main class="cart-container">
                <div className='title-container'>
                    <h2>Carro 🛒</h2>
                </div>
                <hr />
                <div class="products-container">
                    <div className='product-container'>
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
                    </div>

                    <div className='product-container'>
                        <div className='description-container'>img product</div>
                        <div className='description-container'>Nombre Producto</div>
                        <div className='description-container'>Precio</div>
                        <div className='description-container'>desc</div>
                        <div className='description-container'>cantidad</div>
                        <div className='description-container'>eliminar</div>
                    </div>

                </div>
                <div className='total-cart'>
                    <div className='total-container'>
                        <button className='payment-button'>Pagar</button>
                    </div>
                    <div className='total-container'>
                        <div className='total-container-title'>Total</div>
                        <div className='total-container-price'>$100</div>
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
