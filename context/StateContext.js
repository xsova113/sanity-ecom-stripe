import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;

    // Add to the Cart
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item =>
            item._id === product._id
        );

        setTotalPrice(prevTotalPrice =>
            prevTotalPrice + product.price * quantity
        );

        setTotalQuantities(prevTotalQty =>
            prevTotalQty + quantity,
        );


        localStorage.setItem('quantity', JSON.stringify(totalQuantities + quantity));
        // Check if items already in the cart
        if (checkProductInCart) {
            // Update only the quantity
            const updatedCartItems = cartItems.map(cartProduct => {
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            });

            setCartItems(updatedCartItems + quantity);
            localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        } else {
            // Add new products in the cart if its not in
            product.quantity = quantity;
            const newCartItems = [...cartItems, { ...product }];
            setCartItems(newCartItems);
            localStorage.setItem('cart', JSON.stringify(newCartItems));
        }
        toast.success(`${qty} ${product.name} added to cart`);
        localStorage.setItem('quantity', JSON.stringify(totalQuantities));
    };

    // Remove products from the cart
    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id);
        const newCartItem = cartItems.filter(item => item._id !== product._id);

        setTotalPrice(prevTotalPrice =>
            prevTotalPrice - foundProduct.price * foundProduct.quantity
        );
        setTotalQuantities(prevTotalQty => prevTotalQty - foundProduct.quantity);
        setCartItems(newCartItem);
        localStorage.setItem('cart', JSON.stringify(newCartItem));
        localStorage.setItem('quantity', JSON.stringify(totalQuantities - foundProduct.quantity));
    }


    // increase or decrease quantity of a cart product and price
    const toggleCartItemQty = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);

        if (value === 'inc') {
            setCartItems(
                cartItems.map(item => (
                    item._id === id ? { ...item, quantity: item.quantity + 1 } : item
                ))
            );
            localStorage.setItem('cart', JSON.stringify(
                cartItems.map(item => (
                    item._id === id ? { ...item, quantity: item.quantity + 1 } : item
                ))
            ));

            setTotalPrice(prevTotalPrice =>
                prevTotalPrice + foundProduct.price
            );
            setTotalQuantities(prevTotalQuantities =>
                prevTotalQuantities + 1
            )
            localStorage.setItem('quantity', JSON.stringify(totalQuantities + 1));
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems(
                    cartItems.map(item => (
                        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                    ))
                );
                localStorage.setItem('cart', JSON.stringify(
                    cartItems.map(item => (
                        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                    ))
                ));

                setTotalPrice(prevTotalPrice =>
                    prevTotalPrice - foundProduct.price
                );
                setTotalQuantities(prevTotalQuantities =>
                    prevTotalQuantities - 1
                )
                localStorage.setItem('quantity', JSON.stringify(totalQuantities - 1));
            }
        }
    }

    // Increase or decrease quantity of a product
    const increaseQty = () => {
        setQty((prevQty) => prevQty + 1);
    }
    const decreaseQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    };

    useEffect(() => {
        let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        let storedQuantity = JSON.parse(localStorage.getItem('quantity')) || 0;
        setCartItems(storedCart);
        setTotalQuantities(storedQuantity);
    }, []);

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                setCartItems,
                cartItems,
                totalPrice,
                setTotalPrice,
                totalQuantities,
                setTotalQuantities,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                toggleCartItemQty,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);