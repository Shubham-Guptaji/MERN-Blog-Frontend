import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    trendingPosts: [],
    popularAuthorPosts: [],
    tags: [],
}

// function to get all the home page blog posts
export const getHomePagePosts = createAsyncThunk("/get", async () => {
    try {
        const res = axiosInstance.get("/blogs/");

        const response = await res;
        return response.data.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

// Slice for Blog Api

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getHomePagePosts.fulfilled, (state, action) => {
            if(action.payload){
                state.trendingPosts = [...action.payload.trendingPosts];
                state.popularAuthorPosts  = [...action.payload.authorPosts];
                state.tags = [...action.payload.topKeywords].slice(0, 9);
            }
        });
    },
});


export const {} = blogSlice.actions;
export default blogSlice.reducer;