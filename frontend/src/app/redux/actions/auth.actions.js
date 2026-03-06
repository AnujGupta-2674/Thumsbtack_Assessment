import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";

/**
 * Signup user
 */
export const signupUser = createAsyncThunk(
    "auth/signupUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await API.post("/signup", data);
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

/**
 * Login user
 */
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, { rejectWithValue }) => {
        try {
            const response = await API.post("/login", data);
            localStorage.setItem("token", response.data.token);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

/**
 * Fetch current user
 */
export const fetchUser = createAsyncThunk(
    "auth/fetchUser",
    async (_, { rejectWithValue }) => {
        try {

            const token = localStorage.getItem("token");

            const response = await API.get("/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return response.data;

        } catch (error) {

            return rejectWithValue(error.response?.data || error.message);

        }
    }
);

/**
 * Logout
 */
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await API.post("/logout");
            localStorage.removeItem("token");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);