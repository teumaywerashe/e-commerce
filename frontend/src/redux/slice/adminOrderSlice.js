import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`;
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
});

export const fetchAllOrders = createAsyncThunk(
    "adminOrder/getAllOrders",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            return response.data.orders;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const deletOrder = createAsyncThunk(
    "adminOrders/deletOrder",
    async(id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    "adminOrders/updateOrders",
    async({ id, status }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, { status }, getAuthHeader());
            return response.data.updatedOrder;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const adminOrderSlice = createSlice({
    name: "adminOrder",
    initialState: {
        orders: [],
        error: null,
        totalOrders: 0,
        totalSales: 0,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload || [];
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deletOrder.fulfilled, (state, action) => {
                state.orders = state.orders.filter((o) => o._id !== action.payload);
                state.totalOrders = state.orders.length;
                state.totalSales = state.orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const index = state.orders.findIndex((o) => o._id === action.payload._id);
                if (index !== -1) state.orders[index] = action.payload;
            });
    },
});

export default adminOrderSlice.reducer;