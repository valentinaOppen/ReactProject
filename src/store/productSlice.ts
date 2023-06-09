import { createSlice } from '@reduxjs/toolkit'
import { IProductState, IProduct } from '../interfaces/interfaces';
import { apiCallBegan } from './api';

const initialState: IProductState = {
    list: [],
    productSelected: null,
    loading: false,
    delete: false
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
        productsIdVerificationRequested: (state) => {
            state.loading = true;
        },
        productsIdVerificationReceived: (state, action) => {
            state.error = !action.payload;
            state.loading = false;
        },
        productsIdVerificationFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productsAddRequested: (state) => {
            state.loading = true;
        },
        productsAddReceived: (state, action) => {
            state.productSelected = action.payload;
            state.loading = false;
        },
        productsAddFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productsEditRequested: (state) => {
            state.loading = true;
        },
        productsEditReceived: (state, action) => {
            state.productSelected = action.payload;
            state.loading = false;
        },
        productsEditFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productsDeleteRequested: (state) => {
            state.loading = true;
        },
        productsDeleteReceived: (state, action) => {
            state.productSelected = action.payload;
            state.loading = false;
        },
        productsDeleteFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        productSelected: (state, action) => {
            state.productSelected = action.payload.product;
            state.delete = action.payload.delete;
        }
    }
})

export const { productsRequested, productsReceived, productsRequestFailed, productSelected,
    productsIdVerificationRequested, productsIdVerificationReceived, productsIdVerificationFailed,
    productsAddRequested, productsAddReceived, productsAddFailed, productsDeleteFailed,
    productsDeleteReceived, productsDeleteRequested, productsEditFailed, productsEditReceived,
    productsEditRequested } = productSlice.actions;

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

//@ts-ignore
export const validateProductId = (id) => (dispatch) => {
    const urlVerification = `/bp/products/verification?id=${id}`;
    return dispatch(
        //@ts-ignore
        apiCallBegan({
            url: urlVerification,
            onStart: productsIdVerificationRequested.type,
            onSuccess: productsIdVerificationReceived.type,
            onError: productsIdVerificationFailed.type,
        })
    );
};

//@ts-ignore
export const createProduct = (data) => (dispatch) => {
    return dispatch(
        //@ts-ignore
        apiCallBegan({
            url,
            method: 'POST',
            data: data,
            onStart: productsAddRequested.type,
            onSuccess: productsAddReceived.type,
            onError: productsAddFailed.type,
        })
    );
};

//@ts-ignore
export const editProduct = (data) => (dispatch) => {
    return dispatch(
        //@ts-ignore
        apiCallBegan({
            url,
            method: 'PUT',
            data: data,
            onStart: productsEditRequested.type,
            onSuccess: productsEditReceived.type,
            onError: productsEditFailed.type,
        })
    );
};

//@ts-ignore
export const deleteProduct = (id) => (dispatch) => {
    const urlDelete = `/bp/products?id=${id}`;
    return dispatch(
        //@ts-ignore
        apiCallBegan({
            url: urlDelete,
            method: 'DELETE',
            onStart: productsDeleteRequested.type,
            onSuccess: productsDeleteReceived.type,
            onError: productsDeleteFailed.type,
        })
    );
};
