import '../assets/sass/_shoppinghistory.scss';
import { useState, useEffect } from 'react';
import React from 'react'

export default function ShoppingHistory() {

    const [carritos, setCarritos] = useState([]);
    const [selected, setSelected] = useState(null);

    const getCarritos = async () => {
        const res = await fetch('/acordion-obj.json');
        const data = await res.json();
        console.log(data);
        setCarritos(data);
    };

    useEffect(() => {
        getCarritos();

    }, [])



    const toggle = (id) => {
        setSelected(selected === id ? null : id);
    };


    return (
        <>
            
            <title>
                <h2>Historial de compras 📋</h2>
            </title>
            <br />

            <div className='wrapper'>
                <div className='accordion'>
                    {carritos.map((item, id) => (
                        <div key={id} className='item'>
                            <div className='cart-general' onClick={() => toggle(id)}>
                                <div className='cart-general-wrap'>
                                    {/* <div className='crt-gnrl-el'>
                                        <b>Número de compra: {item.id}</b>
                                    </div> */}
                                    <div className='crt-gnrl-el'>
                                        <b>Fecha de compra: {item.createdAt}</b>
                                    </div>
                                    <div className='crt-gnrl-el'>
                                        <b>Dirección: {item.idAddress}</b>
                                    </div>
                                    <div className='crt-gnrl-el'>
                                        <b>Total: {item.total}</b>
                                    </div>
                                </div>
                                <span>{selected === id ? '-' : '+'}</span>
                            </div>
                            <div className={selected === id ? 'cart-detail cart-detail-show' : 'cart-detail'}>
                                {item.cartDetails.map((carritoDetail) => (
                                    <>
                                        <div key={carritoDetail.id}>
                                            <div >Libro: {carritoDetail.bookId}</div>
                                            <div>Precio del libro: {carritoDetail.price}</div>
                                            <div>Cantidad de libros: {carritoDetail.quantity}</div>
                                            <div>Cantidad de sub total: {carritoDetail.subTotal}</div>
                                        </div>
                                        <br />
                                    </>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
