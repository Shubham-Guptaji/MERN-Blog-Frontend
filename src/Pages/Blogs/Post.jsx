import "./Post.css";

import Blocks from "editorjs-blocks-react-renderer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../Layout/Layout";
import { getPost } from "../../Redux/blogSlice";
const Post = () => {
  const url = useParams().url;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postDetails, comments } = useSelector(
    (state) => state?.blog?.currentPost
  );
  let postData;
  try {
    if (postDetails?.content) postData = JSON.parse(postDetails.content);
  } catch (error) {
    navigate("/posts");
  }
  useEffect(() => {
    if (!url) return navigate("/posts");
    PostHandler(url);
  }, []);
  const PostHandler = async () => {
    const response = await dispatch(getPost(url));
    if (!response?.payload?.success) {
      navigate("/not-found");
    }
  };

  const postConfig = {
    code: {
      className: "language-js",
    },
    delimiter: {
      className: "border border-2 w-16 mx-auto",
    },
    embed: {
      className: "border-0",
    },
    header: {
      className: "font-bold text-indigo-600",
    },
    image: {
      className: "w-full max-w-screen-md mx-auto",
      actionsClassNames: {
        stretched: "w-full h-80 object-cover",
        withBorder: "border border-2",
        withBackground: "p-2",
      },
    },
    list: {
      className: "list-inside my-4",
    },
    paragraph: {
      className: "text-base text-justify text-opacity-75 my-4 sm:leading-7 ",
    },
    quote: {
      className: "py-3 px-5 italic font-serif",
    },
    table: {
      className: "table-auto",
    },
  };
  return (
    <Layout>
      {postDetails?.title && (
        <Helmet>
          <title>{postDetails?.title}</title>
          <meta
            name="description"
            content={postDetails?.metaDescription}
          />
          <meta
            name="title"
            content={postDetails?.title}
          />
          <link rel="icon" type="image/x-icon" href="./Alcodemy.png" />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://blog.alcodemy.tech/posts/${url}`} />
          <meta
            property="og:title"
            content={postDetails?.title}
          />
          <meta
            property="og:description"
            content={postDetails?.metaDescription}
          />
          <meta
            property="og:image"
            content={postDetails?.public_image?.resource_url}
          />

          <meta property="twitter:card" content="Alcodemy Blog" />
          <meta property="twitter:url" content={`https://blog.alcodemy.tech/posts/${url}`} />
          <meta
            property="twitter:title"
            content={postDetails?.title}
          />
          <meta
            property="twitter:description"
            content={postDetails?.metaDescription}
          />
          <meta
            property="twitter:image"
            content={postDetails?.public_image?.resource_url}
          />
        </Helmet>
      )}
      <div className="container px-2">
        <div className="post mx-auto my-10 w-full max-w-4xl">
          <h1 className="my-5 text-center text-2xl font-semibold text-indigo-600 md:text-3xl lg:text-4xl">
            {postDetails.title}
          </h1>
          {postDetails?.public_image?.resource_url && (
            <img
              src={postDetails.public_image.resource_url}
              alt={postDetails.title}
              className="my-4 rounded-xl p-2"
            />
          )}
          {postData && <Blocks data={postData} config={postConfig} />}
        </div>
      </div>
    </Layout>
  );
};
export default Post;
