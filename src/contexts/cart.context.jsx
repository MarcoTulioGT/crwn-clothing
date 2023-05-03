import  { createContext, useReducer } from 'react';


import { createAction } from '../utils/reducer/reducer.utils';

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


const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove

    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    //check if quantity is iqual to 1, if it is a remove that item from the cart
        if(existingCartItem.quantity === 1){
            return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
        }

    //return back cartitems with matching cart item with reduced quantity

    return cartItems.map((cartItem) =>
       cartItem.id === cartItemToRemove.id
       ? {... cartItem, quantity: cartItem.quantity - 1}
       : cartItem
       );

}

const clearCartItem = (cartItems, cartItemToClear) =>   cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartItemCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES =  {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartItemCount: 0,
    cartTotal: 0   
}

const cartReducer = (state, action) => {
    const  { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
            ...state,
            ...payload
        };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
            ...state,
            isCartOpen: payload,
            };
        default:
            throw new Error(`inhandled type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children })  => {


    const [ {cartItems,isCartOpen, cartItemCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  

    const updateCartItemsReducer = (newCartItems) => {
        const newCartcount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{cartItems: newCartItems, cartTotal: newCartTotal, cartItemCount: newCartcount}))
    }


    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartITem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);

    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {

        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN,bool));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart, clearItemFromCart, cartItems, cartItemCount, cartTotal};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}