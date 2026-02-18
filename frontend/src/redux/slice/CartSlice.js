import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async({ userId, guestId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`, { params: { userId, guestId } },
            );

            return response.data.carts;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const updateCartQuantity = createAsyncThunk(
    "/cart/updateCartQuantity",
    async({ quantity, productId, guestId, userId, size, color }, { rejectWithValue }, ) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/`, {
                    quantity,
                    productId,
                    guestId,
                    userId,
                    size,
                    color,
                },
            );
            return response.data.cart;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async({ productId, quantity, size, color, guestId, userId }, { rejectWithValue }, ) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                    productId,
                    quantity,
                    size,
                    color,
                    guestId,
                    userId,
                },
            );
            return response.data.cart;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                data: {
                    productId,
                    guestId,
                    userId,
                    size,
                    color,
                },
            });
            return productId;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);

export const mergeCart = createAsyncThunk(
    "cart/mergeCart",
    async({ guestId, user }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { data: { guestId, user } }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data.userCart;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
);
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage(),
        loading: false,
        error: null,
    },
    reducer: {
        clearCart: (state) => {
            state.cart = {
                products: [],
            };
            localStorage.removeItem("cart");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.error = action.error.message || "Faild to load the cart";
                state.loading = false;
            })
            .addCase(addToCart.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.cart = {...loadCartFromStorage(), ...action.payload };
                saveCartToStorage(state.cart);
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.error.message || "Faild to add to cart";
                state.loading = false;
            })
            .addCase(updateCartQuantity.pending, (state) => {
                ((state.error = null), (state.loading = true));
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.error = action.error.message || "Faild to update item quantity";
                state.loading = false;
            })
            .addCase(removeFromCart.pending, (state) => {
                ((state.error = null), (state.loading = true));
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.cart.products = state.cart.products.filter(
                    product => product._id !== action.payload
                );
                saveCartToStorage(state.cart);
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.error.message || "Faild to remove item";
                state.loading = false;
            })
            .addCase(mergeCart.pending, (state) => {
                ((state.error = null), (state.loading = true));
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(state.cart);
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.error = action.error.message || "Faild to merge cart";
                state.loading = false;
            });
    },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;