import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useBookContext } from '../context/BookContext';

export default function ShoppingHistory() {

    const [carts, setCarts] = useState([]);
    const [cartDetails, setCartDetails] = useState([])
    const [selected, setSelected] = useState(null);
    const { token } = useAuthContext();
    const { FormatCoin } = useBookContext()


    const getCarts = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/carts`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            setCarts(data.result);
        } catch (error) {
            console.log(error)
        }
    };

    const getOneCart = async (cart_id) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}user/carts/${cart_id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            setCartDetails(data.result);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getCarts();
    }, [])

    const toggle = (id) => {
        setSelected(selected === id ? null : id);
        getOneCart(id);
    };

    if (carts.length == 0) {
        return (
            <div className="container">
                <h2 className='h2-shopping pt-4'>Historial de compras 📋</h2>
                <p className="text-center fs-md mt-5">Realiza una compra para poder verla acá </p>
                <p className="text-center fs-md">¡Revisa nuestro catálogo de libros <Link to="/books">aquí!</Link> </p>
            </div>
        )
    }

    return (
        <div >
            <h2 className='h2-shopping pt-4'>Historial de compras 📋</h2>
            <div className='wrapper container pt-3 pb-5 '>
                <div className='accordion'>
                    {carts.map((item) => (
                        <div key={item.id} className='item mt-3'>
                            <div className='cart-general' onClick={() => toggle(item.id)}>
                                <div className='cart-general-wrap'>
                                    <div className='crt-gnrl-el  '>
                                        <b>{new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</b>
                                    </div>
                                    <div className='crt-gnrl-el '>
                                        <b>Total: {FormatCoin(item.total)}</b>
                                    </div>
                                    <div className='crt-gnrl-el'>
                                        <b>Dirección: {item.address.address}</b>
                                    </div>
                                </div>
                                <span>{selected === item.id ? '-' : '+'}</span>
                            </div>
                            <div className={selected === item.id ? 'cart-detail cart-detail-show' : 'cart-detail'}>
                                <table>
                                    <thead className='thead-history'>
                                        <tr>
                                            <th>Libro</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartDetails.map((item) => (
                                            <tr key={item.title}>
                                                <td>{item.title}</td>
                                                <td>{FormatCoin(item.price)}</td>
                                                <td>{item.quantity}</td>
                                                <td>{FormatCoin(item.sub_total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
