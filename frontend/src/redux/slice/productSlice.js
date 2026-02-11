import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Query } from "mongoose";

const initialState = [];

export const fetchProductsByFilters = createAsyncThunk(
    "products/fetchByFilters",
    async({
        collection,
        size,
        color,
        gender,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) => {
        const query = new URLSearchParams();
        if (collection) query.append("collection", collection);
        if (size) query.append("size", size);
        if (color) query.append("color", color);
        if (gender) query.append("gender", gender);
        if (minPrice) query.append("minPrice", minPrice);
        if (maxPrice) query.append("maxPrice", maxPrice);
        if (sortBy) query.append("sortBy", sortBy);
        if (search) query.append("search", search);
        if (category) query.append("category", category);
        if (material) query.append("material", material);
        if (brand) query.append("brand", brand);
        if (limit) query.append("limit", limit);
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/API/PRODUCTS/${query.toString}`,
        );
        return response.data;
    },
);



export const fetchProductDetails = createAsyncThunk('products/fetchDetails', async(id) => {
    try {
        const response = await axios.get(`${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
})
fetchProductsByFilters();

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // .addCase(fetchProducts.pending, (state) => {})
        // .addCase(fetchProducts.pending, (state) => {})
        // .addCase(fetchProducts.pending, (state) => {})
        // .addCase(fetchProducts.pending, (state) => {});
    },
});