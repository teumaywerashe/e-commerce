import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Helper for consistency
const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/admin`;
const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
});

// 1. Fetch Users
export const fetchUsers = createAsyncThunk(
    "admin/fetchUsers",
    async(_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/users`, getAuthHeader());
            return response.data.users;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.message);
        }
    }
);

// 2. Add User
export const addUser = createAsyncThunk(
    "admin/addUser",
    async(userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/users`, userData, getAuthHeader());
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.message);
        }
    }
);

// 3. Update User
export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async({ id, name, email, role }, { rejectWithValue }) => {
        try {
            // Note: Backend uses /api/admin/users/:id based on your router mounting
            const response = await axios.put(
                `${API_URL}/users/${id}`, { name, email, role },
                getAuthHeader()
            );
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.message);
        }
    }
);

// 4. Delete User
export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async(id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/users/${id}`, getAuthHeader());
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data.msg || error.message);
        }
    }
);

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload || [];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Add User
        .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

        // Update User
        .addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const updatedUser = action.payload;
            const index = state.users.findIndex((u) => u._id === updatedUser._id);
            if (index !== -1) {
                state.users[index] = updatedUser;
            }
        })

        // Delete User
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter((u) => u._id !== action.payload);
        });
    },
});

export default adminSlice.reducer;