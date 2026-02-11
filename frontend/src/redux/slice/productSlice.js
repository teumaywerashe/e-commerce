import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString}`,
        );
        return response.data;
    },
);

export const fetchProductDetails = createAsyncThunk('products/fetchDetails', async(id) => {

    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products${id}`)
    return response.data

})

export const updateProduct = createAsyncThunk('products/updateProduct', async(id, productData) => {
    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData, {
        headers: {
            Authorizarion: `Bearer ${localStorage.getItem('userToken')}`
        }
    })

    return response.data
})

export const fetchSimilarProducts = createAsyncThunk('products/fetchSimilarProducts', async(id) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/products/${id}`)

    return response.data
})

export const productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null,
        similarProducts: [],
        loading: false,
        error: null,
        filters: {
            category: '',
            size: '',
            color: '',
            gender: '',
            brand: '',
            soldBy: '',
            search: '',
            material: '',
            collection: '',
            minPrice: '',
            maxPrice: ''
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {
                category: '',
                size: '',
                color: '',
                gender: '',
                brand: '',
                soldBy: '',
                search: '',
                material: '',
                collection: '',
                minPrice: '',
                maxPrice: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByFilters.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.products = Array.isArray(action.payload) ? action.payload : []
            })
            .addCase(fetchProductsByFilters.rejected, (state, action) => {
                state.error = action.error.msg
                state.loading = false
            })
            .addCase(fetchProductDetails.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.selectedProduct = action.payload
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.error = action.error.msg
                state.loading = false
            })
            .addCase(updateProduct.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.error = null
                state.loading = false

                const updatedProduct = action.payload
                const index = state.products.findIndex(product => product._id === updatedProduct._id)
                if (index !== -1) {
                    state.products[index] = updateProduct
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.error = action.error.msg
                state.loading = false
            })
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.error = null
                state.loading = true
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.error = null
                state.loading = false
                state.similarProducts = Array.isArray(action.payload) ? action.payload : []
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.error = action.error.msg
                state.loading = false
            })
            // .addCase(fetchProducts.pending, (state) => {});
    },
});


export const { setFilters, clearFilters } = productSlice.actions

export default productSlice.reducer