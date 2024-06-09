import { useEffect } from "react";
import { FaFlag } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { MdThumbUpAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import ChartComponent from "../../Components/DashBoard/DashChart";
import { fetchChartData } from "../../Redux/authSlice";

const Dash = () => {
  const dispatch = useDispatch();
  const {firstName, lastName} = useSelector((state) => state?.auth?.data);
  const profile = useSelector((state) => state?.auth?.profile);
  const data = profile?.data;
  const chartstatdata = profile?.chartData;
  const arr = [
    { title: "Followers", count: data.followers, Icon: MdGroups, bgColor: "bg-indigo-500" },
    { title: "Likes", count: data.likes, Icon: MdThumbUpAlt, bgColor: "bg-amber-400" },
    { title: "Following", count: data.following, Icon: MdGroups, bgColor: "bg-purple-500" },
    { title: "All Posts", count: data.totalPosts, Icon: FaFlag, bgColor: "bg-sky-500" },
    { title: "Comments", count: data.followers, Icon: FaCommentDots, bgColor: "bg-emerald-400" },
    { title: "Live Posts", count: data.postPublished, Icon: FaFlag, bgColor: "bg-pink-500" },
  ];
  useEffect(() => {
    dispatch(fetchChartData());
  }, []);
  return (
      <>
        <h1 className="text-2xl font-semibold md:text-3xl text-center lg:text-start font-sans">
        Hello {firstName + " " + lastName}!
      </h1>
      <p className="text-base mt-4 mb-7 text-indigo-600 text-justify lg:font-semibold">
Welcome to your Blog Dashboard! Here, you can visualize your blog&apos;s performance. Keep an eye on your key metrics and stay informed and engaged with your audience.</p>
      <div className="w-full mb-10">
        {chartstatdata?.likesData && <ChartComponent likesData={chartstatdata?.likesData} followersData={chartstatdata?.followersData} />}

      </div>
      <div className="mt-5 flex flex-wrap gap-6 justify-center ">
        {arr.map((element) => {
          const { title, count, Icon, bgColor } = element;
          return (
            <span
              key={title}
              className={`flex items-center rounded-xl ${bgColor} p-6 w-64 shadow-md`}
            >
              <span className="flex items-center justify-center px-4">
                <Icon className="h-10 w-10 text-white" />
              </span>
              <span className="flex flex-col gap-2 px-4 text-xl font-semibold text-white lg:px-5 py-2">
                <span>{count}</span>
                <span>{title}</span>
              </span>
            </span>
          );
        })}
      </div>
      </>
  );
};
export default Dash;
