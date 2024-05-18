import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "../Redux/authSlice";
import blogSliceReducer from "../Redux/blogSlice";
import commentReducer from "../Redux/CommentSlice";
import miscReducer from "../Redux/Miscellaneous"
import resourceReducer from "../Redux/resourceSlice";

const store  = configureStore({
    reducer: {
        blog: blogSliceReducer,
        auth: authSliceReducer,
        resource: resourceReducer,
        misc: miscReducer,
        comment: commentReducer
    },
});

export default store;