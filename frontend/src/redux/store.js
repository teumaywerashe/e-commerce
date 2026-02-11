import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slice/AuthSlice'
import cartReducer from './slice/CartDlice'
import productReducer from './slice/productSlice'
const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productReducer
    }
})

export default store