import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") ? JSON.parse(localStorage.getItem("isLoggedIn")) : false,
    data: localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : "",
    role: localStorage.getItem("role") || "",
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : "",
    // isLoggedIn: false,
    // data: "",
    // role: ""
    profile: {
        areMore: false,
        isAuthor: false,
        data: {},
        chartData: null
    }
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

export const loginAccount = createAsyncThunk("/sign-in", async (data) => {
    try {
        let res = axiosInstance.post('/user/login', data);
        toast.promise(res, {
            loading: "Logging in to your account...",
            success: (data) => data?.data?.message,
            error: "Failed to Login to your Account."
        })
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
});

// function to handle logout
export const logout = createAsyncThunk("/logout", async () => {
    try {
        let res = axiosInstance.post("/user/logout");

        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log out",
        });

        // getting response resolved here
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
        throw error;
    }
});

export const fetchDash = createAsyncThunk("/dash", async (data) => {
    try {
        let res = axiosInstance.post(`/user/profile/${data.username}`, data.obj);
        toast.promise(res, {
            loading: "Fetching your dashboard profile",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to fetch the profile"
        });
        res = await res;
        return res?.data;
    } catch ( error ) {
        toast.error(error.response.data.message);
        throw error;
    }
})

export const fetchChartData = createAsyncThunk("/chart-data", async () => {
    try {
        let res = axiosInstance.get(`/user/profile/chartdata`);
        toast.promise(res, {
            loading: "Fetching your dashboard statistics",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to fetch the statistics"
        });
        res = await res;
        return res?.data;
    } catch ( error ) {
        toast.error(error.response.data.message);
        throw error;
    }
})

export const updateToken = createAsyncThunk("/user/refresh-token", async () => {
    try {
        let res = await axiosInstance.post("/user/refresh-token");
        return res.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})


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
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem("data", action?.payload?.user ? JSON.stringify(action?.payload?.user) : "");
                localStorage.setItem("isLoggedIn", action?.payload?.success ? action?.payload?.success : false);
                localStorage.setItem("role", action?.payload?.user?.role ? action?.payload?.user?.role : "");

                localStorage.setItem("token", action?.payload?.user?.tokens ? JSON.stringify(action?.payload?.user?.tokens) : "");

                state.isLoggedIn = action?.payload?.success;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
                state.token = action?.payload?.user?.tokens;
            })
            .addCase(logout.rejected, (state) => {
                localStorage.clear();
                // localStorage.setItem("isLoggedIn", false);
                state.isLoggedIn = false;
                state.token = null;
                state.data = null;
            })
            // for user logout
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.isLoggedIn = false;
                state.token = null;
                state.data = null;
            })
            .addCase(updateToken.fulfilled, (state, action) => {
                // localStorage.setItem("data", action?.payload?.user ? JSON.stringify(action?.payload?.user) : "");
                // localStorage.setItem("isLoggedIn", action?.payload?.success ? action?.payload?.success : false);
                // localStorage.setItem("role", action?.payload?.user?.role ? action?.payload?.user?.role : "");

                // localStorage.setItem("token", action?.payload?.tokens ? JSON.stringify(action?.payload?.tokens) : "");
                // state.isLoggedIn = action?.payload?.success;
                // state.token = action?.payload?.tokens;
                
                // modified
                localStorage.setItem("data", action?.payload?.user ? JSON.stringify(action?.payload?.user) : "");
                localStorage.setItem("isLoggedIn", action?.payload?.success ? action?.payload?.success : false);
                localStorage.setItem("role", action?.payload?.user?.role ? action?.payload?.user?.role : "");
                localStorage.setItem("token", action?.payload?.user?.tokens ? JSON.stringify(action?.payload?.user?.tokens) : "");

                state.isLoggedIn = action?.payload?.success;
                state.data = action?.payload?.user;
                state.role = action?.payload?.user?.role;
                state.token = action?.payload?.user?.tokens;
            })
            .addCase(updateToken.rejected, (state) => {
                console.log('rejected');
                localStorage.clear();
                state.token = null;
                state.data = null;
                state.isLoggedIn = false;
                window.location.href = "https://blog.alcodemy.tech";
            })
            .addCase(fetchDash.fulfilled, (state, action) => {
                state.profile.areMore = action?.payload?.areMore;
                state.profile.isAuthor = action?.payload?.isAuthor;
                state.profile.data = action?.payload?.userDetails;
            })
            .addCase(fetchChartData.fulfilled, (state, action) => {
                state.profile.chartData = action?.payload?.chartData;
            })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;