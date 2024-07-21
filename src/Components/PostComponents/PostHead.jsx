import { Helmet } from "react-helmet"
const PostHead = ({postDetails, url}) => {
    return (
        <Helmet>
          
          <meta
            property="og:image"
            content={postDetails?.public_image?.resource_url}
          />
          <meta name="description" content={postDetails?.metaDescription} />
          <meta name="title" content={postDetails?.title} />
          <title>{postDetails?.title}</title>
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
    )
}
export default PostHead;