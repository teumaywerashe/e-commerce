import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slice/AuthSlice'
import cartReducer from './slice/CartSlice'
import productReducer from './slice/productSlice'
import checkoutReducer from './slice/CheckoutSlice'
import orderReducer from './slice/orderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productReducer,
        checkout: checkoutReducer,
        orders: orderReducer
    }
})

export default store