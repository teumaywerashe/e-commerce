import { createAsyncThunk } from "@reduxjs/toolkit";
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
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    },
);

export const createUser = createAsyncThunk(
    "admin/createUser",
    async(userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.filename.VITE_BACKEND_URL}/api/admin/users`,
                userData, { Headers: { Authorization: localStorage.getItem("userToken") } },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error.message);
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
            rejectWithValue(Error.message);
        }
    },
);

export const deleteUser = createAsyncThunk(
    "admin/deleteUser",
    async(id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                    },
                },
            );
            return response.data;
        } catch (error) {
            console.log(error);
            rejectWithValue(error.response.data);
        }
    },
);