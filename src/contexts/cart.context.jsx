import  { createContext, useState, useEffect } from 'react';

const addCartITem = (cartItems, productToAdd) => {
    // find if cartitems cotains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // if found, increment quantity
   if(existingCartItem){
       return cartItems.map((cartItem) =>
       cartItem.id === productToAdd.id
       ? {... cartItem, quantity: cartItem.quantity +1}
       : cartItem
       );
   }
    // return new array with modified cartitems/ new cart item

    return [...cartItems, { ...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemCount: 0
});

export const CartProvider = ({ children })  => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemCount, setCartItemCount] = useState(0);


    useEffect ( () => {
        const count = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartItemCount(count);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartITem(cartItems, productToAdd));

    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartItemCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}