import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Zoom, toast } from "react-toastify"
import { useAuthContext } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';
import { useCartContext } from '../context/CartContext';
import { useAddressesContext } from '../context/AddressesContext';

const Cart = () => {

    const { favorites, token, user } = useAuthContext();
    const { books, FormatCoin  } = useBookContext();
    const { cart, setCart, deleteFromCart, addToCart } = useCartContext();
    const { userAddresses, selectedAddress, setSelectedAddress } = useAddressesContext();

    const [loading, setLoading] = useState(false);

    //Funcion que borra un tipo de libro del carrito
    const handleDeleteFromCart = (idBook) => {
        deleteFromCart(idBook);
        toast.warning("Eliminaste el libro del carro")
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

    const totalPurchaseCalculated = () => {
        const cartDetail = cart.map((book) => {
            const { bookProduct, quantity } = book;
            const priceBook = bookProduct.price;
            const subtotal = priceBook * quantity;

            return {
                quantity,
                price: priceBook,
                subtotal,
                bookId: bookProduct.id,
            };
        });
        return cartDetail;
    };

    //Función que agrega un tipo de libro al carrito (orientado a favoritos)
    const handleAddToCart = (bookDetailed) => {
        const book = books.find(book => bookDetailed.book_id == book.id);
        addToCart(book)
        toast.success("Agregaste el libro al carro")
    }

    const cartDetail = totalPurchaseCalculated();

    //Función que envía el contenido del carrito al backend
    const handleCheckout = async () => {

        let postData = { "address_id": selectedAddress.id }
        let cart_details = []
        cart.map((item) => {
            const detail = { "quantity": item.quantity, "book_id": item.bookProduct.id }
            cart_details.push(detail)
        }
        )
        postData["cart_details"] = cart_details

        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}user/purchase`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Error en la solicitud al servidor.");
            }
            const data = await response.json();
            toast.info("Compra exitosa 📖", { position: toast.POSITION.TOP_CENTER, transition: Zoom })
            setLoading(false);
            setTimeout(() => setCart([]), 2000);
            localStorage.setItem("cart", JSON.stringify([]));
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    }

    // HanddleAddressSelection para manejar la dirección activa que sólo debe ser una
    const handleAddressSelection = (addressId) => {
        // En la función handleAddressSelection, actualiza el estado de la dirección seleccionada.
        const selected = userAddresses.find((address) => address.id === addressId);
        return setSelectedAddress(selected);
    };

    useEffect(() => {
    }, [cart])

    return (
        <>
            <main className='general-container'>
                <div className="accordion-container">
                    {/* Domicilios 🏠 */}
                    <h2 className='carrito-title'>Domicilios 🏠</h2>
                    {userAddresses == 0 ? (<>
                        <div>
                            <p className="text-center fs-md mt-5">Agrega un domicilio <Link to={`/user/${user.id}/addresses`}>aquí</Link> para poder efectuar tu compra! </p>
                        </div>
                    </>) : (<>
                        <div className="accordion" id="accordionExample">
                            {userAddresses.map((address, index) => (
                                <div className="accordion-item" key={address.id}>
                                    <h2 className="accordion-header h2-cart" id={`heading${index}`}>
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
                        {selectedAddress && selectedAddress.address && selectedAddress.delivery_price && selectedAddress.commune_name && selectedAddress.region_name && (
                            <>
                                <div>
                                    <br />
                                    <h5>Dirección activa:</h5>
                                    <p><strong>{selectedAddress.address}</strong> - Costo de envío: {FormatCoin(Number(selectedAddress.delivery_price))}</p>
                                    <p>
                                        Comuna: {selectedAddress.commune_name} - Región: {selectedAddress.region_name}
                                    </p>
                                </div>
                                <p><strong>¿No encuentras tu domicilio? ¡Agregalo <Link to={`/user/${user.id}/addresses`}>aquí!</Link></strong></p>
                            </>
                        )}

                    </>)}

                </div>

                {/* Cart 🛒 */}
                <h2 className='carrito-title pt-5 mt-5'>Carrito 🛒</h2>


                {cart.length === 0 ? (<>
                    <div  >
                        <p className="text-center fs-md mt-5">Aún no hay elementos en el carrito. Visita el catálogo <Link to="/books">aquí</Link> o revisa tu lista de favoritos!</p>
                    </div>
                </>) : <>
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
                                    <td>{FormatCoin(Number(book.bookProduct.price) * Number(book.quantity))}</td>
                                    <td>
                                        <button className="eliminar-button" onClick={() => handleDeleteFromCart(book.bookProduct.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {selectedAddress && selectedAddress.address && selectedAddress.delivery_price && selectedAddress.commune_name && selectedAddress.region_name && (
                                <tr>
                                    <th colSpan="4"><strong>Envío</strong></th>
                                    <th colSpan="1"><strong>{FormatCoin(Number(selectedAddress.delivery_price))}</strong></th>
                                    <th colSpan="1">-</th>
                                </tr>
                            )}

                            {totalPurchase !== 0 && selectedAddress && selectedAddress.delivery_price ? (
                                <tr>
                                    {/* <!-- Celda para el total de ventas --> */}
                                    <th colSpan="4"><strong>Total de Ventas:</strong></th>
                                    <th colSpan="1"><strong>{FormatCoin(Number(totalPurchase) + Number(selectedAddress.delivery_price))}</strong></th>
                                    {/* <!-- Celda para el botón de pagar --> */}
                                    <th colSpan="1" data-label="Acciones">
                                        <button onClick={() => addToCartContainer()} className="pagar-button">
                                            {loading ? "Procesando..." : "Pagar"}
                                        </button>
                                    </th>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </>}

                <h2 className='carrito-title pt-5 mt-5'>Favoritos❤️</h2>
                {favorites.length === 0 ? (<>
                    <div  >
                        <p className="text-center fs-md mt-5">Aún no cuentas con favoritos. Visita el catálogo <Link to="/books">aquí</Link>!</p>
                    </div>
                </>) : (<>
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
                            {favorites.map((item) => {
                                return (
                                    <tr key={item.book_id}>
                                        <td>{item.author.name}</td>
                                        <td>{item.title}</td>
                                        <td>{item.category.name}</td>
                                        <td>
                                            <button onClick={() => handleAddToCart(item)} className='agregar-button'>Agregar a carrito
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>)}

            </main >
        </>
    );
};

export default Cart;