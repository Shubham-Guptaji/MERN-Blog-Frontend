import { Link, useNavigate } from "react-router-dom";

const PostTemplate = (props) => {
  const navigate = useNavigate();
    return (
        <div className="card max-w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src={props.element.public_image.resource_url}
            alt={props.element.title}
            height="1600px"
            width="900px"
            className="aspect-video cursor-pointer"
            onClick={() => {
                navigate(`/posts/${props.element.url}`);
              }}
          />
        </figure>
        <div className="card-body">
          <h2
            className="card-title line-clamp-2 cursor-pointer text-indigo-600"
            onClick={() => {
              navigate(`/posts/${props.element.url}`);
            }}
          >
            {props.element.title}
          </h2>
          <p className=" line-clamp-3 text-justify font-medium text-gray-600">
            {props.element.metaDescription}
          </p>
          <div className="mt-2 flex items-center w-full  font-semibold justify-between">
            
            <div >{props.element.likes} Likes</div>
            <Link
              className="btn btn-primary bg-indigo-700 px-5 text-[17px] tracking-wider"
              to={`/posts/${props.element.url}`}
            >
              Read
            </Link>
          </div>
        </div>
      </div>
    )
}
export default PostTemplate;