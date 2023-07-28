// import '../assets/cart.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import { useCartContext } from '../context/CartContext';
import { useAddressesContext } from '../context/AddressesContext';


const Cart = () => {

    const { favorites, token, user } = useAuthContext();
    const { books } = useBookContext();
    const { cart, setCart, deleteFromCart, addToCart } = useCartContext();
    const { userAddresses, setUserAddresses, selectedAddress, setSelectedAddress, getAddresses } = useAddressesContext();

    const [loading, setLoading] = useState(false);

    // const [selectedAddressId, setSelectedAddressId] = useState(null);


    //Funcion que borra un tipo de libro del carrito
    const handleDeleteFromCart = (idBook) => {
        deleteFromCart(idBook);
    }

    //Función que incrementa un tipo de libro en el carrito
    const handleIncrementBook = (idBook) => {
        console.log('Soy el arreglo de direcciones de usuario')
        console.log(userAddresses)
        const newCart = cart.map((item) => item.bookProduct.id === idBook ?
            { ...item, quantity: item.quantity + 1 } : item);
        setCart(newCart);
    };
    console.log('Carro con todo:', cart);

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
    console.log('Total: ' + totalPurchase);

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

    const createCartContainer = () => {
        if (cart == []) {
            const createdAt = new Date();

            const cartContainer = {
                user: user.id,
                createdAt: createdAt,
                addressId: selectedAddress.id,
            }
        }
        const cartContainer = {
            user: user.id,
            createdAt: createdAt,
            addressId: selectedAddress.id,
        }

    }


    //Función que agrega un tipo de libro al carrito (orientado a favoritos)
    const handleAddToCart = (bookDetailed) => {
        addToCart(bookDetailed)
    }


    const cartDetail = totalPurchaseCalculated();
    console.log('CartDetail', cartDetail);
    console.log('Libro', cart);



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
    }

    // HanddleAddressSelection para manejar la dirección activa que sólo debe ser una
    const handleAddressSelection = (addressId) => {
        // En la función handleAddressSelection, actualiza el estado de la dirección seleccionada.
        const selected = userAddresses.find((address) => address.id === addressId);
        console.log(selected);

        return setSelectedAddress(selected);
    };



    // Función para agregar productos al carrito en el frontend
    const addToCartContainer = async () => {
        // Supongamos que previamente has recopilado la información necesaria del usuario

        // Referencia de elementos a enviar en carrito
        const address_id = 123; // ID de la dirección seleccionada por el usuario
        const cart_details = [
            { book_id: 456, quantity: 2 }, // Ejemplo de un libro seleccionado con su cantidad
            { book_id: 789, quantity: 1 }, // Ejemplo de otro libro seleccionado con su cantidad
            // Puedes agregar más libros seleccionados aquí si es necesario
        ];

        // Datos a enviar al backend
        const data = {
            address_id: selectedAddress.id,
            cart_details: cartDetail,
        };

        try {
            // Configurar la solicitud fetch para enviar los datos al backend
            const response = await fetch('/api/addCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // En este punto, no necesitas enviar el token de autorización por los encabezados
                    // porque el middleware verifyToken en el backend ya lo maneja.
                    // El token de autorización debe estar almacenado en una cookie o en el almacenamiento local
                    // y se enviará automáticamente en todas las solicitudes al backend.
                    // Si tu backend está configurado para manejar las cookies automáticamente, esta parte es manejada por el navegador.
                    // De lo contrario, si estás almacenando el token en LocalStorage, puedes enviarlo manualmente como un encabezado personalizado aquí.
                },
                body: JSON.stringify(data), // Convertimos el objeto "data" a una cadena JSON y lo enviamos en el cuerpo de la solicitud.
            });

            // Procesar la respuesta del backend
            const responseData = await response.json();
            // Aquí puedes manejar la respuesta del backend, si es necesario
            console.log(responseData);
            // Por ejemplo, podrías mostrar un mensaje al usuario indicando que se ha agregado al carrito exitosamente.

        } catch (error) {
            // Aquí puedes manejar errores de la solicitud o del backend, si ocurren
            console.error('Error:', error);
        }
    };



    return (
        <>
            <main className='general-container'>
                <div className="accordion-container">
                    {/* Domicilios 🏠 */}
                    <h1 className='carrito-title'>Domicilios 🏠</h1>
                    <div className="accordion" id="accordionExample">
                        {userAddresses.map((address, index) => (
                            <div className="accordion-item" key={address.id}>
                                <h2 className="accordion-header" id={`heading${index}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`} onClick={() => handleAddressSelection(address.id)}>
                                        {address.address}
                                    </button>
                                </h2>
                                <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <strong>{address.commune_name}</strong> - {address.region_name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedAddress && (
                        <>
                            <div>
                                <br />
                                <h5>Dirección activa:</h5>
                                <p><strong>{selectedAddress.address}</strong> - Costo de envío: ${selectedAddress.delivery_price}</p>
                                <p>
                                    Comuna: {selectedAddress.commune_name} - Región: {selectedAddress.region_name}
                                </p>
                            </div>
                            <p><strong>¿No encuentras tu domicilio? ¡Agregalo <Link to="/user/addresses">aquí!</Link></strong></p>

                        </>
                    )}

                </div>

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