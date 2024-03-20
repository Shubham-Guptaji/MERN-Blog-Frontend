// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../Layout.js/Layout";
import { getHomePagePosts } from "../Redux/blogSlice";

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getHomePagePosts());
    },[])

    const {trendingPosts} = useSelector(state => state.blog);
    return (
        <Layout>
        {trendingPosts.map(element => {
            return(<div key={element._id} className="my-2 h-full w-full">
            {element.title}
        </div>)
        })}
        hello
        </Layout>
    )
}
export default HomePage;
