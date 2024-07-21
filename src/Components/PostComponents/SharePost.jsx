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

const SharePost = ({postDetails, url}) => {
    return (
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
    )
}

export default SharePost;