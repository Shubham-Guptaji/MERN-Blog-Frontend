import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import PostCard from "../../Components/DashBoard/PostCard";
import { fetchDash } from "../../Redux/authSlice";

const AllPost = () => {
    const dispatch = useDispatch();
    const {username} = useSelector((state) => state?.auth?.data);
    const [currentPage, setCurrentPage] = useState(useSelector(state => state?.auth?.profile?.dashPostPage))
    const areMore = useSelector(state => state?.auth?.profile?.areMore);
    const data = useSelector((state) => state?.auth?.profile?.data?.blogPosts);
    useEffect(() => {
        let userData = {username, obj: {skip: currentPage * 20}};
        dispatch(fetchDash(userData));
    }, [currentPage])
    return (
            <>
                <h1 className="text-2xl lg:text-3xl font-semibold text-primary mb-5">All Blog Posts</h1>
            <div className="flex flex-col gap-3">
            {
                data && data.length != 0 && data?.map((post) => <PostCard key={post._id} post={post} />)
            }
            {!data.length && (
        <div className="flex flex-col items-center justify-center h-60 w-full text-2">
          <h1 className="text-2xl font-semibold text-primary lg:text-3xl ">
            You have not created any post yet. Let's create
          </h1>
        </div>
      )}
            </div>

            <div className="mx-auto mb-8 mt-12 w-fit">
          <div className="join">
            <button
              className={`btn join-item ${currentPage <= 0 ? "btn-disabled" : ""}`}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button className="btn btn-primary join-item">
              Page {currentPage + 1}
            </button>
            <button
              className={`btn join-item ${!areMore ? "btn-disabled" : ""}`}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <FiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
            </>
    )
}

export default AllPost;