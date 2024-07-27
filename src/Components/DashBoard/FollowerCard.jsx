import { Link, useNavigate } from "react-router-dom";
import convertUrl from "../../Helper/imageToWebp";

const FollowerCard = ({ data }) => {
  const navigate = useNavigate();
  const date = new Date(data.createdAt);
  const newDate = date.toLocaleDateString("en-GB");
  return (
    <div className="mb-6 flex flex-shrink flex-col items-center justify-center space-x-3 ">
      <div
        className="h-24 w-32 cursor-pointer overflow-hidden rounded-2xl bg-gray-200 shadow shadow-gray-500 sm:h-28 sm:w-36 xl:h-32 xl:w-44"
        onClick={() => navigate(`/username/${data.username}`)}
      >
        <img
          src={data.avatar}
          alt={data.title}
          className="transform duration-300 hover:scale-125 "
        />
      </div>

      <div
        className="mt-2 cursor-pointer text-center  text-lg font-medium text-primary hover:text-indigo-800"
        onClick={() => navigate(`/username/${data.username}`)}
      >
        {data.fullName}
      </div>
      <div className=" text-center italic text-gray-500">
        Followed : {newDate}
      </div>
    </div>
  );
};
export default FollowerCard;
