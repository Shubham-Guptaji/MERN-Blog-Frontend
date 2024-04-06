import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false,
    data: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : "",
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "",

}

export const createAccount = createAsyncThunk("/sign-up", async (data) => {
    try {
        let res = axiosInstance.post("/user/register", data);
        toast.promise(res, {
            loading: "Creating Your Account ...",
            success: (data) => data?.data?.message,
            error: "Failed to Create Account"
        })
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message)
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.fulfilled, (state, action) => {
                localStorage.setItem("data", action?.payload?.user ? JSON.stringify(action?.payload?.user) : "");
                localStorage.setItem("isLoggedIn", action?.payload?.success ? action?.payload?.success : false);
                localStorage.setItem("role", action?.payload?.user?.role ? action?.payload?.user?.role : "");
                localStorage.setItem("token", action?.payload?.user?.tokens ? JSON.stringify(action?.payload?.user?.tokens) : "");
                state.isLoggedIn = action?.payload?.success;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
                state.token = action?.payload?.user?.tokens;
            })
    }
})

export const {} = authSlice.actions;
export default authSlice.reducer;