import { useSelector } from "react-redux";

import PostCard from "../../Components/DashBoard/PostCard";

const AllPost = () => {

    const data = useSelector((state) => state?.auth?.profile?.data?.blogPosts);
    return (
            <>
                <h1 className="text-2xl lg:text-3xl font-semibold text-primary mb-5">All Blog Posts</h1>
            <div className="flex flex-col gap-3">
            {
                data && data.length && data?.map((post) => <PostCard key={post._id} post={post} />)
            }
            </div>
            </>
    )
}

export default AllPost;