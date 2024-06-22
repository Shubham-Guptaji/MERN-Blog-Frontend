import { useEffect, useState } from "react";
import { FaThumbsUp, FaTrash } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchDash } from "../../Redux/authSlice";
import { deletePost, publishPost, unPublishPost } from "../../Redux/blogSlice";
const AuthRecent = ({ post }) => {
  const navigate = useNavigate();
  const { username } = useSelector((state) => state?.auth?.data);
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  function postStatus() {
    if (isActive) {
      setIsActive(false);
      dispatch(unPublishPost({ id: post._id }));
    } else {
      setIsActive(true);
      dispatch(publishPost({ id: post._id }));
    }
  }
  async function deleteHandler() {
    const response = await dispatch(
      deletePost({ id: post._id, authorId: post.author })
    );
    if (response?.payload?.success) {
      dispatch(fetchDash({ username }));
    }
  }
  useEffect(() => {
    setIsActive(post.isPublished);
  }, []);
  return (
    <>
      <div className="card mb-3 bg-base-100 shadow-xl lg:card-side">
        <figure className="lg:w-3/12 ">
          <img
            src={post.public_image.resource_url}
            alt={post.title}
            height="1600px"
            width="900px"
            className="aspect-video w-full"
            onClick={() => {
              navigate(`/posts/${post.url}`);
            }}
          />
        </figure>
        <div className="card-body lg:w-9/12">
          <div className="mt-1 flex items-center gap-2 font-semibold">
            <div>
              <span
                className={`${isActive ? "text-green-500" : "text-red-800"}`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="ms-auto flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="toggle toggle-success toggle-sm"
                checked={isActive}
                onChange={postStatus}
              />

              <MdEditSquare className="h-6 w-6 text-purple-700 cursor-pointer" onClick={() =>
                    navigate("/update", {
                      state: { post },
                    })
                  } />

              <button
                onClick={() =>
                  document.getElementById("my-delete-modal").showModal()
                }
              >
                <FaTrash className="h-4 w-4 text-red-600" />
              </button>
              <dialog id="my-delete-modal" className="modal">
                <div className="modal-box">
                  <h3 className="text-lg font-bold text-indigo-700">
                    Confirm Delete
                  </h3>
                  <p className="py-4 text-black">
                    Are you sure you want to delete this post ?
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn me-2" onClick={deleteHandler}>
                        Confirm
                      </button>
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>

              <span className="flex items-center gap-1 text-primary">
                <FaThumbsUp className="h-4 w-4" /> {post.likes}
              </span>
            </div>
          </div>
          <h2
            className="card-title line-clamp-2 cursor-pointer text-indigo-600"
            onClick={() => {
              navigate(`/posts/${post.url}`);
            }}
          >
            {post.title}
          </h2>
          <p
            className=" line-clamp-3 cursor-pointer text-justify font-medium text-gray-600"
            onClick={() => {
              navigate(`/posts/${post.url}`);
            }}
          >
            {post.metaDescription}
          </p>

          {/* <div className="card-actions mt-3 justify-end">
            <Link
              className="btn btn-primary bg-indigo-700 px-5 text-[17px] tracking-wider"
              to={`/posts/${props.element.url}`}
            >
              Read
            </Link>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default AuthRecent;
