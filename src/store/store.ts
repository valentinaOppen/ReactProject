import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import productReducer  from '../store/productSlice'
import api from './middelware'

export default configureStore({
    reducer: {
        product: productReducer
    },
    middleware: [...getDefaultMiddleware(), api]
})