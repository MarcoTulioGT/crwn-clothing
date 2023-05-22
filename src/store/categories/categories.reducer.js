import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { CART_ACTION_TYPES } from '../cart/cart.types';

import { createSlice } from "@reduxjs/toolkit";

export const CATERGORIES_INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null
}


export const categoriesSlice = createSlice({
name: 'categories',
initialState: CATERGORIES_INITIAL_STATE,
reducers: {
    setCategories(state,action) {
        state.categories = action.payload;
    }
},
});

export const { setCategories } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

export const categoriesReducerOLD = (state = CATERGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type){
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true};
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, categories: payload , isLoading: false};
        case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
            return { ...state, error: payload , isLoading: false};
        default:
            return state;
    }
}