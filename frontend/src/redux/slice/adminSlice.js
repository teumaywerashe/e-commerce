import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    "/admin/fetchUsers",
    async({ rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.filename.VITE_BACKEND_URL}/api/admin/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data.users;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

export const addUser = createAsyncThunk(
    "admin/addUser",
    async(userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                userData, { Headers: { Authorization: localStorage.getItem("userToken") } },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.message);
        }
    },
);

export const updateUser = createAsyncThunk(
    "admin/updateUser",
    async({ id, email, name, role }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`, { name, email, role }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(Error.message);
        }
    },
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async(id, { rejectWithValue }) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return id;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data);
        }
    },
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
            .addCase(fetchUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(addUser.pending, (state) => {
                ((state.error = null), (state.loading = true));
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.users.push(action.payload.user);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const updatedUser = action.payload;
                const userIndex = state.users.findIndex(
                    (user) => user._id === updatedUser._id,
                );
                if (userIndex !== -1) {
                    state.users[userIndex] = updateUser;
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const id = action.payload;
                state.users = state.users.filter((user) => user._id !== id);
            });
    },
});

export default adminSlice.reducer;