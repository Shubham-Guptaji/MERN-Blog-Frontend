import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../Helper/axiosInstance";

const initialState = {
    trendingPosts: [],
    popularAuthorPosts: [],
    tags: [],
    allPosts: [],
    areMore: false,
    keywords: [],
    currentPost : {
        postDetails : {},
        recentPosts : []
        // comments : {},
    }
}

export const createPost = createAsyncThunk("/", async (data) => {
    try {
        
        let res = axiosInstance.post("/blogs/create", data);
        toast.promise(res, {
            loading: "Loading...",
            // success: (data) => {
            //     return data?.data?.message;
            // },
            success: "Blog Post created Successfully",
            error: "Failed to create the Post",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updatePost = createAsyncThunk("/update-post", async (allData) => {
    try {
        let res = axiosInstance.put(`/blogs/${allData.id}`, allData.data);
        toast.promise(res, {
            loading: "Updating...",
            // success: (data) => {
            //     return data?.data?.message;
            // },
            success: "Blog Post updated Successfully",
            error: "Failed to update the Post",
        });
        res = await res;
        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});


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

export const getPost = createAsyncThunk("/post/get", async (data) => {
    try {
        let res = axiosInstance.post(`/blogs/${data.url}`, data);
        toast.promise(res, {
            loading: "Loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to load the Post",
        });
        res = await res;
        return res.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

// function to get all posts;
export const allblogposts = createAsyncThunk("/all-posts", async (skip = 0) => {
    try {
        const res = axiosInstance.get(`/blogs/posts?skip=${skip}`);
        const response = await res;
        return response?.data;
    } catch (err) {
        toast.error(err?.response?.data?.message);
    }
})

// function to get the searched keywords;
export const searchTag = createAsyncThunk("/all-posts/search", async (data) => {
    try {
        const res = axiosInstance.post("/blogs/tag", {tagsearch : data.tag, skip : data.skip ? data.skip : 0});
        const response = await res;
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// function to unpublish using the patch request;
export const unPublishPost = createAsyncThunk("/unpublish", async (data) => {
    try {
        const res = axiosInstance.patch(`/blogs/${data.id}`);
        const response = await res;
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// function to publish using the patch request;
export const publishPost = createAsyncThunk("/publish", async (data) => {
    try {
        const res = axiosInstance.patch(`/blogs/publish/${data.id}`);
        const response = await res;
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

// function to publish using the patch request;
export const deletePost = createAsyncThunk("/delete-post", async (data) => {
    try {
        const res = axiosInstance.delete(`/blogs/${data.id}`, data);
        toast.promise(res, {
            loading: "Deleting the post...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to delete the Post",
        });
        const response = await res;
        return response?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})







// Slice for Blog Api

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHomePagePosts.fulfilled, (state, action) => {
                if(action.payload){
                    state.trendingPosts = [...action.payload.trendingPosts];
                    state.popularAuthorPosts  = [...action.payload.authorPosts];
                    state.tags = [...action.payload.topKeywords].slice(0, 9);
                }
            })
            .addCase(allblogposts.fulfilled, (state, action) => {
                if(action.payload){
                    state.allPosts = [...action.payload.posts];
                    state.areMore = action.payload.areMore;
                    state.keywords = [...action.payload.keywords].slice(0, 10);
                }
            })
            .addCase(searchTag.fulfilled, (state, action) => {
                if(action.payload){
                    state.allPosts = [...action.payload.posts];
                    state.areMore = action.payload.areMore;
                    state.keywords = [...action.payload.keywords].slice(0, 10);
                }
            })
            .addCase(getPost.fulfilled, (state, action) => {
                if(action.payload){
                    state.currentPost.postDetails = action?.payload?.postDetails;
                    state.currentPost.recentPosts = action?.payload?.recentPosts;

                }
            })
    },
});


export const {} = blogSlice.actions;
export default blogSlice.reducer;