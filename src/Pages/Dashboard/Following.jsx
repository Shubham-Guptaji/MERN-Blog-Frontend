import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import FollowerCard from "../../Components/DashBoard/FollowerCard";
import { meFollowing } from "../../Redux/Miscellaneous";

const Following = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const areMore = useSelector(
      (state) => state?.misc?.followers?.meFollow
    );
    const Followers = useSelector((state) => state?.misc?.meFollow?.authors);
    console.log(areMore, Followers);
    useEffect(() => {
      dispatch(meFollowing({skip : currentPage * 20}));
    }, [currentPage]);
    return (
      <>
      <h1 className="text-2xl lg:text-3xl font-semibold text-primary mb-10">All the Followed Authors</h1>
          <div className="grid justify-center gap-3 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 ">
          {/* <div className="flex justify-around flex-wrap w-full gap-2"> */}
          {Followers && Followers.map((data) => {
          return <FollowerCard key={data._id} data={data} />;
        })}
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
    );
}
export default Following;