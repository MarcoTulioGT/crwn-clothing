import { createSlice } from "@reduxjs/toolkit";

import  { CART_ACTION_TYPES } from "./cart.types";


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



export const CART_INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: CART_INITIAL_STATE,
    reducers: {
        setIsCartOpen(state, action) {
          state.isCartOpen = action.payload;  
        },
        addItemToCart(state, action){
            state.cartItems = addCartITem(state.cartItems, action.payload);
        },
        removeItemFromCart(state, action){
            state.cartItems = removeCartItem(state.cartItems, action.payload);
        },
        clearItemFromCart(state, action) {
            state.cartItems = clearCartItem(state.cartItems, action.payload);
        }
    }
})

export const cartReducerOLD = (state = CART_INITIAL_STATE, action = {}) => {
    const  { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
        return {
            ...state,
            cartItems: payload,
        };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
            ...state,
            isCartOpen: payload,
        };
        default:
            return state;
    }
}

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart} = cartSlice.actions;


export const cartReducer = cartSlice.reducer;