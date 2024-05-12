import "./Post.css";

import Blocks from "editorjs-blocks-react-renderer";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import Layout from "../../Layout/Layout";
import { getPost } from "../../Redux/blogSlice";
import { DisLikeHandler, LikeHandler, PostLike } from "../../Redux/Miscellaneous";
const Post = () => {
  const url = useParams().url;
  const userId = useSelector((state) => state?.auth?.data?.id);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likes = useSelector(state => state?.misc?.postLikes);
  const isLiked = useSelector(state => state?.misc?.isLiked);
  const { postDetails, comments } = useSelector(
    (state) => state?.blog?.currentPost
  );
  let postData;
  try {
    if (postDetails?.content) postData = JSON.parse(postDetails.content);
  } catch (error) {
    navigate("/posts");
  }
  // let likes;
  // if(miscLike != null) likes = miscLike;
  // else likes = postDetails?.likes || 0;
  // let isLiked;
  // if(isLiked != null) isLiked = miscIsLiked;
  // else isLiked = postDetails?.isLiked || false;

  const Likefn = async () => {
    if(!isLoggedIn) {
      toast.error("Login to Like the Post..");
      return;
    }
    const data = { postId: postDetails?._id};
    if(!isLiked) await dispatch(LikeHandler(data));
    else await dispatch(DisLikeHandler(data));
  }
  useEffect(() => {
    if (!url) return navigate("/posts");
    PostHandler(url);
  }, []);
  const PostHandler = async () => {
    const response = await dispatch(getPost({url, userId}));
    if (!response?.payload?.success) {
      navigate("/not-found");
    }
    let data = {postId: response?.payload?.postDetails?._id, userId};
    await dispatch(PostLike(data));
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
      className: "py-3 px-5 italic font-serif w-full my-5 bg-gray-100 rounded-md",
    },
    table: {
      className: "table-auto w-full ",
    },
  };
  
  return (
    <Layout>
      {postDetails?.title && (
        <Helmet>
          <title>{postDetails?.title}</title>
          <meta name="description" content={postDetails?.metaDescription} />
          <meta name="title" content={postDetails?.title} />
          <link rel="icon" type="image/x-icon" href="./Alcodemy.png" />

          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content={`https://blog.alcodemy.tech/posts/${url}`}
          />
          <meta property="og:title" content={postDetails?.title} />
          <meta
            property="og:description"
            content={postDetails?.metaDescription}
          />
          <meta name="keywords" content={`${postDetails.seoKeywords}`} />
          <meta
            property="og:image"
            content={postDetails?.public_image?.resource_url}
          />

          <meta property="twitter:card" content="Alcodemy Blog" />
          <meta
            property="twitter:url"
            content={`https://blog.alcodemy.tech/posts/${url}`}
          />
          <meta property="twitter:title" content={postDetails?.title} />
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
      <div className="container px-4 mx-auto">
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

          <div className="flex flex-wrap gap-2">
            <FacebookShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              quote={postDetails?.metaDescription}
              hashtag="#Alcodemy"
            >
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              title={postDetails?.title}
              hashtags={postDetails?.seoKeywords?.split(",")}
            >
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
            <TelegramShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              title={postDetails.title}
            >
              <TelegramIcon size={32} round={true} />
            </TelegramShareButton>
            <WhatsappShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              title={postDetails.title}
              separator="-"
            >
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>
            <LinkedinShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              title={postDetails.title}
              summary={postDetails.metaDescription}
              source="Alcodemy Blog"
            >
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <EmailShareButton
              url={`https://blog.alcodemy.tech/posts/${url}`}
              subject={postDetails?.title}
              body={postDetails?.metaDescription}
            >
              <EmailIcon size={32} round={true} />
            </EmailShareButton>
          </div>

          {postData && <Blocks data={postData} config={postConfig} />}
          <div className="my-4 flex items-center gap-2 font-semibold">
            <span>Do You like this Post ?</span>{" "}
            <span className="cursor-pointer ">
              {!isLiked ? 
                (<AiOutlineHeart className="h-6 w-6" onClick={Likefn} />) : 
                (<AiFillHeart className="h-6 w-6 fill-indigo-600" onClick={Likefn} />)
              }
            </span>
            <span>{likes}</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Post;
