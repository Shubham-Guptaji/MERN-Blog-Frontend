// import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import homeImage from "../assets/undraw_Happy_news_re_tsbd.png";
import AuthRecent from "../Components/Home/Auth-Recent-Card";
import TrendingCards from "../Components/Home/Trending-Cards";
import Layout from "../Layout.js/Layout";
import { getHomePagePosts } from "../Redux/blogSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomePagePosts());
  }, []);

  const { trendingPosts, popularAuthorPosts, tags } = useSelector((state) => state.blog);
  // const { popularAuthorPosts } = useSelector((state) => state.blog);
  return (
    <Layout>
      <header className="container mx-auto flex flex-col-reverse px-3 md:w-10/12 md:flex-row">
        <div className=" flex h-[inherit]  items-center xl:w-4/6">
          <div className="h-fit w-full ">
            <h1 className=" text-center font-serif text-4xl font-bold text-indigo-600 md:text-start md:text-3xl lg:text-5xl xl:text-6xl">
              Unlocking the Creativity
            </h1>
            <p className="mt-4 text-justify text-xl font-semibold leading-8 md:mt-1 md:text-start lg:mt-3 lg:text-2xl lg:leading-9 xl:mt-7">
              Explore narratives, ideas, and knowledge shared by authors across
              diverse topics.
            </p>
            <button className="btn btn-primary mt-5 bg-indigo-700 text-xl md:mt-3 lg:mt-5 lg:tracking-wider xl:mt-9">
              Create Own
            </button>
          </div>
        </div>
        <img
          src={homeImage}
          alt="Alcodemy Front Page"
          className="mx-auto mb-7 max-h-96 w-full max-w-96 md:mb-0 md:max-h-full md:w-2/4 md:max-w-full"
        />
      </header>
      <section className="container mx-auto px-3 md:w-10/12 ">
        <h2 className="mb-8 mt-12 text-center text-4xl font-bold sm:text-start">
          Trending Posts
        </h2>
        <div className="grid justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trendingPosts.map((element) => (
            <TrendingCards element={element} key={element._id} />
          ))}
        </div>
      </section>
      <section className="container mx-auto px-3 md:w-10/12 ">
        <h2 className="mb-8 mt-12 text-center text-4xl font-bold sm:text-start">
          Recent Posts
        </h2>
        <div className="flex">
          <div className=" w-8/12 justify-center">
            {popularAuthorPosts.map((element) => (
              <AuthRecent element={element} key={element._id} />
            ))}
          </div>
          <div className="w-4/12 ">
              <div className="flex flex-wrap px-2 gap-3">
              {tags.map((element) => {
                return (<Link to={`/search/${element.replace(/\s+/g, '-')}`} key={element} className="p-3 pt-2 pb-2 text-indigo-600 ring-2 rounded-full text-center">{element}</Link>)
              })}
              </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto mb-8 mt-7 md:w-10/12">
        <Link
          className="inline cursor-pointer rounded bg-indigo-600 p-5 pb-2 pt-2 text-2xl text-white hover:bg-indigo-700"
          to="/posts"
        >
          All Posts
        </Link>
      </div>
    </Layout>
  );
};
export default HomePage;
