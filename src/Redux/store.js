import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "../Redux/authSlice";
import blogSliceReducer from "../Redux/blogSlice";

const store  = configureStore({
    reducer: {
        blog: blogSliceReducer,
        auth: authSliceReducer
    },
});

export default store;