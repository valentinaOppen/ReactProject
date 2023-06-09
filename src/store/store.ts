import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import productReducer from '../store/productSlice'
import api from './middelware'

export default configureStore({
    reducer: {
        product: productReducer
    },
    middleware: [...getDefaultMiddleware(), api, thunk]
})