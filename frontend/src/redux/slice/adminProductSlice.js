import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/product`;
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
});

export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchadminProduct",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, getAuthHeader());
            return response.data.products;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const createAdminProduct = createAsyncThunk(
    "adminProduct/createAdminProduct",
    async(productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(API_URL, productData, getAuthHeader());
            return response.data.createProduct;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const updateProduct = createAsyncThunk(
    "adminProduct/updateProduct",
    async({ id, productData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/product/${id}`, productData, getAuthHeader());
            return response.data.updateProduct;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const deleteProducts = createAsyncThunk(
    "adminProduct/deleteProduct",
    async(id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: { products: [], error: null, loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload || [];
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createAdminProduct.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.loading = false;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.products.findIndex((p) => p._id === action.payload._id);
                if (index !== -1) state.products[index] = action.payload;
                state.loading = false;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.products = state.products.filter((p) => p._id !== action.payload);
            });
    },
});

export default adminProductSlice.reducer;