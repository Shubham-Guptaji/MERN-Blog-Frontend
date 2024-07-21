import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchDash, updateProfile } from "../../Redux/authSlice";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useState } from "react";
import toast from "react-hot-toast";

const EditProfile = (props) => {
    const data = useSelector((state) => state?.auth?.data);
    const dispatch = useDispatch();
    const [userInput, setUserInput] = useState({
        firstName: data?.firstName,
        lastName: data?.lastName,
        bio: data?.bio,
        email: data?.email,
        avatar: null,
        previewImage: data?.avatar?.secure_url,
      });

      // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  };
  // function to handle user input
  const handleUserInput = (event) => {
    const { name, value } = event.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  // function to handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    //   checking for the empty fields
      if (
        !userInput.firstName ||
        !userInput.lastName ||
        !userInput.bio ||
        !userInput.email 
      ) {
        toast.error("All fields are mandatory");
        return;
      } else if (
        !userInput.email.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )
      ) {
        toast.error("Invalid Email Id");
        return;
      }

      const formdata = new FormData();
      formdata.append("firstName", userInput.firstName);
      formdata.append("lastName", userInput.lastName);
      formdata.append("bio", userInput.bio);
      formdata.append("email", userInput.email);
      if(userInput.avatar) formdata.append("avatar", userInput.avatar);
      // calling the api
      let res = await dispatch(updateProfile(formdata));
    
    // clearing the input fields
    if (res?.payload?.success) {
      setUserInput({
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        avatar: null,
        previewImage: null,
      });
      await dispatch(fetchDash({username: data?.username}));
      props.changePage(6);
    }
}
    return (
        <>
             <div className="flex items-center justify-center min-h-[100vh] lg:min-h-[auto] sm:h-[80vh] px-2">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4  bg-indigo-500 text-white w-[700px] sm:min-h-[auto] min-h-[750px] sm:h-[470px] my-16 sm:my-10 shadow-[0_0_10px_black] relative"
        >

          <button
          className="absolute top-8 text-2xl link text-accent cursor-pointer sm:inline w-fit"
          onClick={() => props.changePage(6)}
          >
            <AiOutlineArrowLeft />
            
          </button>

          <h1 className="text-center text-2xl font-bold">
            <span>Update Profile</span>
          </h1>

          <main className="sm:grid sm:grid-cols-2 gap-x-2 sm:gap-x-10">
            <div className="space-y-6">
              <div
              >
                <label className="cursor-pointer" htmlFor="image_uploads">
                  {userInput.previewImage ? (
                    <img
                      className="w-full h-44 m-auto border"
                      src={userInput.previewImage}
                      alt="preview "
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg text-center">
                        Upload your Profile Image
                      </h1>
                    </div>
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
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="email">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter the email"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.email}
                  onChange={handleUserInput}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="firstName">
                  First Name
                </label>
                <input
                  required
                  type="name"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter the First name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.firstName}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  required
                  type="name"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter the lastName name"
                  className="bg-transparent px-2 py-1 border"
                  value={userInput.lastName}
                  onChange={handleUserInput}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="bio">
                  Bio
                </label>
                <textarea
                  required
                  type="text"
                  name="bio"
                  id="bio"
                  placeholder="Enter the bio"
                  className="bg-transparent px-2 py-1 border h-24 overflow-y-scroll resize-none"
                  value={userInput.bio}
                  onChange={handleUserInput}
                />
              </div>
            </div>
          </main>

          <div className="flex gap-5 mx-auto flex-wrap items-center justify-center">
          <button
            className=" btn btn-warning"
            type="submit"
          >
            Update Profile
          </button>
          <Link to={"/change-password"} className=" btn btn-info ">Change Password</Link>
          </div>
        </form>
      </div>
        </>
    )
}
export default EditProfile;