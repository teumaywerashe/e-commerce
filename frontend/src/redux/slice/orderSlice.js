import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
            );
            return response.data;
        } catch (error) {
            console.log(error.response.data || error.message);
            return rejectWithValue(error.response.data || error.message);
        }
    },
);

export const fetchOrderDetails = createAsyncThunk(
    "order/fetchOrderDeetails",
    async(orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/order/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        totalOrders: 0,
        orders: [],
        loading: false,
        error: null,
        orderDetail: null,
    },
    reducers: {},
    extraReducers: (builder) =>
        builder
        .addCase(fetchUserOrders.pending, (state) => {
            ((state.loading = true), (state.error = null));
        })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.orders = action.payload;
            state.totalOrders = action.payload.length;
        })
        .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
        })
        .addCase(fetchOrderDetails.pending, (state) => {
            ((state.loading = true), (state.error = null));
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.orderDetail = action.payload;
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.msg;
        }),
});
export default orderSlice.reducer;