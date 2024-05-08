import AttachesTool from "@editorjs/attaches";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Link from "@editorjs/link";
import Marker from "@editorjs/marker";
import NestedList from "@editorjs/nested-list";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Raw from "@editorjs/raw";
import SimpleImage from "@editorjs/simple-image";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import UploadImg from "../../assets/undraw_add_files_re_v09g.svg";
import Layout from "../../Layout/Layout";
import { createPost } from "../../Redux/blogSlice";
import { BlogResource, ResourceUpload } from "../../Redux/resourceSlice";

function Editor() {
  const editorHolder = useRef(null);
  const navigate = useNavigate();
  const [resourceArr, setResourceArr] = useState([]);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    tags: [],
    seoKeywords: "",
    metaDescription: "",
    url: "",
    postImage: undefined,
    authorId: useSelector((state) => state?.auth?.data?.id),
  });
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const [tagValue, setTagValue] = useState("");
  const dataHandler = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  const tagHandler = () => {
    if (tagValue == "") return;
    setPostData({
      ...postData,
      tags: [...postData.tags, tagValue],
    });
    setTagValue("");
  };

  const getImage = (event) => {
    event.preventDefault();
    const uploadedImage = event.target.files[0];
    if (uploadedImage) {
      setPostData({
        ...postData,
        postImage: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  };

  useEffect(() => {
    const editor = new EditorJS({
      holder: editorHolder.current,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Enter a header",
            levels: [2, 3, 4, 5, 6],
            defaultLevel: 3,
          },
        },
        paragraph: {
          class: Paragraph,
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: CheckList,
        quote: Quote,
        attaches: {
          class: AttachesTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const response = await dispatch(ResourceUpload(file));
                if (!response?.payload?.success) {
                  throw new Error("File upload failed");
                }
                let newId = response?.payload?.data?.id;
                setResourceArr({...resourceArr, newId})
                return {
                  success: 1,
                  file: {
                    url: response?.payload?.data?.resource_url,
                  },
                };
              },
            },
          },
        },
        image: {
          class: Image,
          config: {
            uploader: {
              async uploadByFile(file) {
                const response = await dispatch(ResourceUpload(file));
                if (!response?.payload?.success) {
                  throw new Error("Image upload failed");
                }
                let newId = response?.payload?.data?.id;
                setResourceArr([...resourceArr, newId])
                return {
                  success: 1,
                  file: {
                    url: response?.payload?.data?.resource_url,
                  },
                };
              },
            },
          },
        },
        simpleImage: SimpleImage,
        link: Link,
        embed: {
          class: Embed,
          inlineToolbar: true,
        },
        table: Table,
        delimiter: Delimiter,
        warning: Warning,
        code: Code,
        raw: Raw,
        marker: Marker,
        inlineCode: InlineCode,
      },
      onReady: () => {
        console.log("Editor.js is ready");
      },
      // onChange: async (savedData) => {
      onChange: async () => {
        setData(await editor.save());
      },
    });
  }, []);
  const postHandler = async (events) => {
    events.preventDefault();
    if (data) postData.content = data;
    if (
      !postData.title ||
      !postData.content ||
      !postData.tags.length ||
      !postData.seoKeywords ||
      !postData.metaDescription ||
      !postData.url ||
      !postData.postImage
    ) {
      toast.error("All fields are mandatory!!");
      return;
    }
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", JSON.stringify(postData.content));
    formData.append("tags", JSON.stringify(postData.tags));
    formData.append("seoKeywords", postData.seoKeywords);
    formData.append("metaDescription", postData.metaDescription);
    formData.append("url", postData.url.replace(/\s+/g, "-"));
    formData.append("postImage", postData.postImage);
    formData.append("authorId", postData.authorId);

    const response = await dispatch(createPost(formData));
    if (response?.payload?.success) {
      let data = {};
      data.id = response?.payload?.newBlog?._id;
      data.resources = resourceArr;
      await dispatch(BlogResource(data));
      setPostData({
        title: "",
        content: "",
        tags: [],
        seoKeywords: "",
        metaDescription: "",
        url: "",
        postImage: null,
      });
      navigate("/dashboard");
    }
  };

  return (
    <Layout>
      
      <div className="container mx-auto px-2">
        <h1 className="text-3xl lg:text-5xl font-bold text-center text-indigo-600 mt-5">Alcodemy POST Editor</h1>
        <input
          type="text"
          name="title"
          value={postData.title}
          className="mt-8 w-full border-none px-1 py-3 text-center text-3xl outline-none mb-5"
          onChange={dataHandler}
          placeholder="Enter Post Title"
        />
        {!data && <p className=" text-xl mb-3 text-gray-700 max-w-7xl mx-auto">Main Post Content in Box. Click Inside</p>}
        <div
          ref={editorHolder}
          className="editor-container mb-8 border-2 border-indigo-700 max-w-7xl mx-auto py-4"
          id="editorjs"
        />
      </div>
      <div className="divider"></div>
      <div className="my-5 px-2">
        <form
          onSubmit={postHandler}
          className="mx-auto flex w-full flex-col items-center gap-2 md:max-w-2xl lg:max-w-4xl xl:max-w-5xl"
        >
          {!previewImage && (
            <span className="mb-5 mt-3 text-xl font-bold">
              Upload Post Image
            </span>
          )}
          <label className="mb-5 cursor-pointer" htmlFor="image_uploads">
            {previewImage ? (
              <img
                className="m-auto h-auto w-full  max-w-5xl"
                src={previewImage}
                alt="preview image"
              />
            ) : (
              <img
                src={UploadImg}
                className="m-auto h-auto max-h-48 w-full max-w-3xl"
              />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .jpeg, .png"
          />

          <label className="form-control w-full ">
            <div className="label">
              <span className="text-xl">Post Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Post Meta Description"
              name="metaDescription"
              value={postData.metaDescription}
              onChange={dataHandler}
            ></textarea>
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="text-xl">Seo Keywords</span>
            </div>
            <input
              type="text"
              placeholder="Seo Keywords separated by comma"
              className="input input-bordered w-full "
              name="seoKeywords"
              value={postData.seoKeywords}
              onChange={dataHandler}
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="text-xl">Tags</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add Tag Here"
                className="input input-bordered w-full "
                name="tags"
                value={tagValue}
                onChange={(events) => setTagValue(events.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={tagHandler}
                type="button"
              >
                Add
              </button>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {postData.tags.map((element) => {
              return (
                <span
                  key={element}
                  className="rounded-full p-3 pb-2 pt-2 text-center text-indigo-600 ring-2 "
                >
                  {element}
                </span>
              );
            })}
          </div>
          <label className="form-control w-full ">
            <div className="label">
              <span className="text-xl">Site Url</span>
            </div>
            <input
              type="text"
              placeholder="Enter your unique url"
              className="input input-bordered w-full "
              name="url"
              value={postData.url}
              onChange={dataHandler}
            />
          </label>
          <button
            className="btn btn-primary mx-auto mb-5 mt-8 w-full max-w-xs"
            type="submit"
          >
            Post
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Editor;
