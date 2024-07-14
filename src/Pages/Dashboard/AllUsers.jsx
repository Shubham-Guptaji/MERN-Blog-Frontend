import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AllRegisteredUser } from "../../Redux/authSlice";
import UserCard from "../../Components/DashBoard/UserCard";

const AllUsers = () => {
    const dispatch = useDispatch();
    const {data, areMore, count} = useSelector(state => state?.auth?.registeredData);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        dispatch(AllRegisteredUser({currentPage}));
    }, [currentPage])
    return (
        <>
        <h1 className="mb-3 text-2xl font-semibold text-primary lg:text-3xl ">
            All the Registered Users 
        </h1>
        <p className="flex flex-wrap items-center gap-2 text-lg mb-7">
        <span className="font-semibold">Total Users: </span><span className="px-4 py-1 rounded-full bg-primary text-white">{count}</span>
        </p>


        <div className="grid justify-center gap-3 grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 ">
          {data && data.map(data => (<UserCard data={data} key={data._id}/>))}
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

export default AllUsers;