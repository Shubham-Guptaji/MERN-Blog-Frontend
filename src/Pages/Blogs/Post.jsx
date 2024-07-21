import "./Post.css";

import Blocks from "editorjs-blocks-react-renderer";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { deletePost, getPost } from "../../Redux/blogSlice";
import { fetchComments } from "../../Redux/CommentSlice";
import { CreateComment } from "../../Redux/CommentSlice";
import {
  DisLikeHandler,
  Follow,
  IsFollowing,
  LikeHandler,
  PostLike,
  UnFollow,
} from "../../Redux/Miscellaneous";
import CommentCard from "./PostComponents/CommentCard";
import PostCard from "./PostComponents/PostCard";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
const Post = () => {
  const url = useParams().url;
  const userId = useSelector((state) => state?.auth?.data?.id);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isVerified = useSelector((state) => state?.auth?.data?.isVerified);
  const role = useSelector((state) => state?.auth?.data?.role) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likes = useSelector((state) => state?.misc?.postLikes);
  const isLiked = useSelector((state) => state?.misc?.isLiked);
  const followId = useSelector((state) => state?.misc?.followId);
  const isFollowing = useSelector((state) => state?.misc?.isFollowing);
  const postComments = useSelector((state) => state?.comment?.comments);
  const recentPosts = useSelector(
    (state) => state?.blog?.currentPost?.recentPosts
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { postDetails } = useSelector((state) => state?.blog?.currentPost);
  let postData;
  try {
    if (postDetails?.content) postData = JSON.parse(postDetails.content);
  } catch (error) {
    navigate("/posts");
  }

  const Likefn = async () => {
    if (!isLoggedIn) {
      toast.error("Login to Like the Post..");
      return;
    }
    const data = { postId: postDetails?._id };
    if (!isLiked) await dispatch(LikeHandler(data));
    else await dispatch(DisLikeHandler(data));
  };
  useEffect(() => {
    if (!url) return navigate("/posts");
    PostHandler(url);
  }, [url]);

  const followHandler = async () => {
    if (!isLoggedIn) return toast.error("Login to follow..");
    if (!isVerified) return toast.error("Your account isn't verified yet");
    dispatch(
      Follow({ authId: postDetails?.author?._id, blogId: postDetails?._id })
    );
  };
  const unfollowHandler = async () => {
    if (!isLoggedIn || !followId)
      return toast.error("You should be loggedin with followId.");
    dispatch(UnFollow({ FollowId: followId }));
  };

  const PostHandler = async () => {
    const response = await dispatch(getPost({ url, userId }));
    if (!response?.payload?.success) {
      navigate("/not-found");
    }
    dispatch(fetchComments({ blogId: response?.payload?.postDetails?._id }));
    let data = { postId: response?.payload?.postDetails?._id, userId };
    dispatch(PostLike(data));
    const authId = response?.payload?.postDetails?.author?._id;
    if (isLoggedIn && authId) dispatch(IsFollowing({ authId }));
  };

  const commentHandler = async (event) => {
    event.preventDefault();
    if (!isLoggedIn) return toast.error("Login to comment..");
    if (newComment == "") return;
    let response = await dispatch(
      CreateComment({ blogId: postDetails?._id, comment: newComment })
    );
    if (response?.payload?.success) {
      setNewComment("");
      dispatch(fetchComments({ blogId: postDetails?._id }));
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
      className:
        "py-3 px-5 italic font-serif w-full my-5 bg-gray-100 rounded-md",
    },
    table: {
      className: "table-auto w-full ",
    },
  };
  async function deletePostHandler() {
    if (!isLoggedIn) return toast.error("Login to delete..");
    const response = await dispatch(
      deletePost({ id: postDetails._id, authorId: postDetails.author })
    );
    if (response?.payload?.success) {
      navigate(-1);
    }
  }

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

      <div
        className={`relative z-10 ${!isDeleting && "hidden"}`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {/* <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      --> */}
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Delete This Post
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this post? All of
                        post's Data including content, likes and comments will be removed permanently. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => deletePostHandler()}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setIsDeleting(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="post mx-auto my-10 w-full max-w-4xl">
          <h1 className="my-5 text-center text-2xl font-semibold text-indigo-600 md:text-3xl lg:text-4xl">
            {postDetails.title}
          </h1>
          {postDetails?.public_image?.resource_url && (

            <div className="relative w-full">
              <img
                src={postDetails.public_image.resource_url}
                alt={postDetails.title}
                className="mx-auto my-4 h-auto w-full rounded-xl p-2"
                width="1920"
                height="1080"
              />
              {((userId && userId == postDetails.author._id) ||
                (role && role == "admin")) && (

                <div className="absolute right-0 top-0 m-2 flex gap-2">
                  <div
                    className="glass w-fit cursor-pointer rounded hover:bg-gray-200"
                    onClick={() => {
                      let post = postDetails;
                      navigate("/update", {
                        state: { post },
                      });
                    }}
                  >
                    <MdEditSquare className="h-8 w-8 text-white hover:text-blue-600" />
                  </div>
                  <div
                    className="glass w-fit cursor-pointer rounded hover:bg-gray-200"
                    onClick={() => setIsDeleting(true)}
                  >
                    <MdDeleteForever className="h-8 w-8 text-white hover:text-blue-600" />
                  </div>
                </div>
              )}
            </div>
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
              {!isLiked ? (
                <AiOutlineHeart className="h-6 w-6" onClick={Likefn} />
              ) : (
                <AiFillHeart
                  className="h-6 w-6 fill-indigo-600"
                  onClick={Likefn}
                />
              )}
            </span>
            <span>{likes}</span>
          </div>

          {/* About Author  */}

          <div className="mt-16 flex flex-col justify-between rounded bg-gray-100 p-2 sm:flex-row sm:p-4">
            <div className="sm:max-w-md">
              <Link to={`/username/${postDetails?.author?.username}`}>
                <img
                  src={postDetails?.author?.avatar?.secure_url}
                  alt={postDetails?.author?.username}
                  className="h-20 w-20 rounded-full border-2  bg-gray-500"
                />
              </Link>
              <Link to={`/username/${postDetails?.author?.username}`}>
                <h2 className="my-2 text-xl font-semibold sm:text-2xl">
                  Post Author{" "}
                  {postDetails?.author?.firstName +
                    " " +
                    postDetails?.author?.lastName}
                </h2>
              </Link>
              <span className="font-semibold">
                {postDetails?.author?.followers}{" "}
                {postDetails?.author?.followers > 1 ? "Followers" : "Follower"}
              </span>
              <p className="mt-3 text-justify">{postDetails?.author?.bio}</p>
            </div>
            <div className="px-2 ">
              {userId != postDetails?.author?._id && (!isFollowing ? (
                <button
                  className="btn btn-primary mt-3"
                  onClick={followHandler}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="hover:btn-primary-content btn mt-3"
                  onClick={unfollowHandler}
                >
                  Following
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}

          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Comments :</h2>
            {isLoggedIn ? (
              <form className="mt-4 w-full px-4" onSubmit={commentHandler}>
                <textarea
                  className="h-24 w-full rounded-md border-2 border-indigo-600 p-2 "
                  placeholder="Your comment here"
                  value={newComment}
                  onChange={(event) => setNewComment(event.target.value)}
                ></textarea>
                <button className="btn btn-primary mt-4 ">Add comment</button>
              </form>
            ) : (
              <p className="mt-3 text-center text-lg font-semibold">
                Login to comment on this Post.
              </p>
            )}
            <div className="mt-8">
              {postComments?.map((comment) => (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  postDetails={postDetails}
                />
              ))}
            </div>
            <hr className="mt-8" />
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-indigo-600 sm:text-3xl">
                Posts you may like
              </h4>
              <div className="mt-6 flex flex-wrap justify-center gap-5">
                {recentPosts?.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Post;
