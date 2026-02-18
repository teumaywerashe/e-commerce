import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slice/AuthSlice'
import cartReducer from './slice/CartSlice'
import productReducer from './slice/productSlice'
import checkoutReducer from './slice/CheckoutSlice'
import orderReducer from './slice/orderSlice'
import adminReducer from './slice/adminSlice'
import adminProductReducer from './slice/adminProductSlice'
import adminOrderReducer from './slice/adminOrderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        products: productReducer,
        checkout: checkoutReducer,
        orders: orderReducer,
        admin: adminReducer,
        adminProduct: adminProductReducer,
        adminOrders: adminOrderReducer,
    }
})

export default store