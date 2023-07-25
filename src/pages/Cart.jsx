import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import { useCartContext } from '../context/CartContext';


const Cart = () => {

    const { favorites, token } = useAuthContext();
    const { books } = useBookContext();
    const { cart, setCart, deleteFromCart, addToCart } = useCartContext();


    const [loading, setLoading] = useState(false);

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
    //Invoca la función para calcular el total de todo el carrito
    const totalPurchase = totalPurchaseCalculate();//Original


    //Función que extrae y crea un objeto desde el arreglo de carrito
    //Para llevarlo al POST en el backend
    const totalPurchaseCalculated = () => {
        const cartDetail = cart.map((book) => {
            const { bookProduct, quantity } = book;
            const priceBook = bookProduct.price;
            const subtotal = priceBook * quantity;

            return {
                quantity,
                price: priceBook,
                subtotal,
                //cartId: 1, // Supongamos que el id del carrito es 1 No envía el id del Carrito general
                bookId: bookProduct.id,
            };
        });
        return cartDetail;
    };


    //Función que agrega un tipo de libro al carrito (orientado a favoritos)
    const handleAddToCart = (bookDetailed) => {
        addToCart(bookDetailed)
    }


    const cartDetail = totalPurchaseCalculated();
    console.log(cartDetail);


    //Función que envía el contenido del carrito al backend
    const handleCheckout = async () => {
        const cartDetail = totalPurchaseCalculate();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3002/api/v1/user/purchase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    //address_id: 123, // Id de la dirección
                    cart_details: cartDetail,
                }),
            });

            if (!response.ok) {
                // Si la respuesta del servidor no es exitosa, lanzamos una excepción
                // y el bloque catch se encargará de manejar el error
                throw new Error("Error en la solicitud al servidor.");
            }
            const data = await response.json();
            // Aquí puedes manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito o error
            console.log(data);
        } catch (error) {
            // Manejar errores si es necesario
            console.error("Error al enviar datos a cart_detail:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className='general-container'>
                {/* Cart 🛒 */}
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
                                <td>
                                    <img className='img-product' src={book.bookProduct.image} width="50" height="75" alt="" />
                                </td>
                                <td>{book.bookProduct.title}</td>
                                <td>
                                    <button onClick={() => handleDecrementBook(book.bookProduct.id)} className="btn-minus">-</button>
                                    <span>{book.quantity}</span>
                                    <button onClick={() => handleIncrementBook(book.bookProduct.id)} className="btn-plus">+</button>
                                </td>
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
                                <button onClick={handleCheckout} className="pagar-button">
                                    {loading ? "Procesando..." : "Pagar"}
                                </button>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <h2>Direcciones🧭</h2>
                <table>
                    <thead>
                        {/* <tr ><th colSpan="5">Direcciones</th></tr> */}
                        <tr>                
                            <th>Dirección</th>
                            <th>Comuna</th>
                            <th>Región</th>
                            <th>Costo envío</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                            
                            <td>Dirección</td>
                            <td>Comuna</td>
                            <td>Región</td>
                            <td>Costo envío</td>
                        </tr>
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
                                <tr key={id} className='favorites-header'>
                                    <td className='id-author'>{book.author.name}</td>
                                    <td className='id-name'>{book.title}</td>
                                    <td className='id-category'>{book.category.name}</td>
                                    <td>
                                        <button onClick={() => handleAddToCart(book)} className='agregar-button'>Agregar a carrito
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
        </>
    );
};
export default Cart;