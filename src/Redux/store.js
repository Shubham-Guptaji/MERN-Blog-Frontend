import { configureStore } from "@reduxjs/toolkit";

import blogSliceReducer from "../Redux/blogSlice";

const store  = configureStore({
    reducer: {
        blog: blogSliceReducer,
    },
});

export default store;