// import React, { createContext, useContext, useState, useEffect } from "react";


// const CartContext = createContext();

// export const CartContextProvider = ({ children }) => {

//     // Se crean los estados del cart
//     const [cartItems, setCartItems] = useState([]);//Inicializamos el carrito como array vacío vacío
//     const [totalPrice, settotalPrice] = useState();//
//     const [totalQuantities, settotalQuantities] = useState();
//     const [qty, setQty] = useState(1);

//     const onAdd = ()

//     //Incrementamos el carrito
//     const incQty = () => {
//         setQty((prevQty) => prevQty + 1);
//     }

//     //Decrementamos el carrito
//     const decQty = () => {
//         setQty((prevQty) => {
//             if (prevQty - 1 < 1) return 1;
//             return prevQty - 1
//         });
//     }

//     return (
//         // Se pasan las propiedades del contexto, se crea el contexto
//         <CartContext.Provider
//             // enviamos los valores que utilizamos en el contexto
//             value={{
//                 cartItems,
//                 totalPrice,
//                 totalQuantities,
//                 qty,
//                 incQty,
//                 decQty,
//             }}
//         >
//             {children}
//         </CartContext.Provider>
//     )
// }

// export const useCartContext = () => useContext(CartContext);

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext();

export const CartContextProvider = ({ children }) => {


    //Estado carrito
    const [cart, setCart] = useState(initialState);

    // useEffect(() => {
    //     if (cart) {
    //         const cartSaved = localStorage.getItem("cart");
    //         if (cartSaved) {
    //             setCart(JSON.parse(cartSaved));
    //         }
    //     }

    // }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])



    const addToCart = (bookProduct) => {
        const bookInCart = cart.find((book) => book.bookProduct.id === bookProduct.id);
        console.log(bookInCart);

        if (bookInCart) {
            const newCart = cart.map((item) => item.bookProduct.id === bookProduct.id ?
                { ...item, quantity: item.quantity + 1 } : item);
            setCart(newCart);
        } else {
            setCart([...cart, { bookProduct, quantity: 1 }]);
        }
        // setCart([...cart, bookProduct]);
    };


    const deleteFromCart = (idBookProduct) => {
        // const newCart = cart.filter((bookProduct) => bookProduct.id !== idBookProduct);
        // setCart(newCart);

        const newCart = cart.filter((item) => item.bookProduct.id !== idBookProduct);
        setCart(newCart);
    }

    return (
        // Se pasan las propiedades del contexto, se crea el contexto
        <CartContext.Provider
            // enviamos los valores que utilizamos en el contexto
            value={{
                cart,
                setCart,
                addToCart,
                deleteFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);