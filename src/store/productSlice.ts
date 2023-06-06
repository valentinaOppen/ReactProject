import { createSlice } from '@reduxjs/toolkit'
import { IProductState } from '../interfaces/interfaces';
import { apiCallBegan } from './api';

const initialState: IProductState = {
    list: [],
    loading: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
    reducers: {
        productsRequested: (state) => {
            state.loading = true;
        },
        productsReceived: (state, action) => {
            state.list = action.payload;
            state.loading = false;
        },
        productsRequestFailed: (state) => {
            state.loading = false;
        },
    }
})

export const { productsRequested, productsReceived, productsRequestFailed } = productSlice.actions;

export default productSlice.reducer;

const url = "/bp/products";

//@ts-ignore
export const loadProducts = () => (dispatch) => {
    return dispatch(
        //@ts-ignore
        apiCallBegan({
            url,
            onStart: productsRequested.type,
            onSuccess: productsReceived.type,
            onError: productsRequestFailed.type,
        })
    );
};