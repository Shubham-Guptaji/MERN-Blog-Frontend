import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    comments : [],
}

export const CreateComment = createAsyncThunk("/comments", async (data) => {
    try {
        let response = axiosInstance.post("/comments", data);
        toast.promise(response, {
            loading: "Adding your comment",
            success: "Commented on post successfully.",
            error: "Failed to comment on the blog post."
        })
        response = await response;
        return response?.data
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const fetchComments = createAsyncThunk("/fetch-comments", async (data) => {
    try {
        let response = await axiosInstance.get(`/comments/${data.blogId}`);
        return response?.data;
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const deleteComment = createAsyncThunk("/comments/delete", async (data) => {
    try {
        let response = axiosInstance.delete(`/comments/${data}`);
        toast.promise(response, {
            loading: "Deleting your comment",
            success: "Deleted your comment successfully.",
            error: "Failed to delete comment on the blog post."
        })
        response = await response;
        return response?.data
    } catch (error) {
        toast.error(error.response.data.message);
    }
});

export const editComment = createAsyncThunk("/comment/edit", async (data) => {
    try {
        let response = axiosInstance.put(`/comments/${data.commentId}`, data);
        toast.promise(response, {
            loading: "Updating your comment",
            success: "Updated your comment successfully.",
            error: "Failed to update comment on the blog post."
        })
        response = await response;
        return response?.data
    } catch (error) {
        toast.error(error.response.data.message);
    }
})

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.comments = action?.payload?.comments;
            })
    }
})

export const {} = commentSlice.actions;
export default commentSlice.reducer;