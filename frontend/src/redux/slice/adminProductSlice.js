import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAdminProducts = createAsyncThunk(
    "adminProducts/fetchadminProduct",
    async({ rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/product`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    },
);

export const createAdminProduct = createAsyncThunk(
    "adminProduct/createAdminProduct",
    async(productData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/product`,
                productData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    },
);

export const updateProduct = createAsyncThunk(
    "adminProduct/updateProduct",
    async({ id, productData }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/product/${id}`,
            productData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            },
        );
        return response.data;
    },
);

export const deleteProducts = createAsyncThunk(
    "adminProduct/deleteProduct",
    async(id) => {
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/product/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            },
        );
        return id;
    },
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAdminProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAdminProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;

                const productIndex = state.products.findIndex(
                    (product) => product._id === updatedProduct._id,
                );
                if (productIndex !== -1) {
                    state.products[productIndex] = updatedProduct;
                }
                state.loading = false;
            })
            .addCase(createAdminProduct.fulfilled, (state, action) => {
                state.products = state.products.push(action.payload);
                state.loading = true;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter(
                    (product) => product._id !== action.payload,
                );
            });
    },
});

export default adminProductSlice.reducer;