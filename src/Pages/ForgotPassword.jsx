import { useState } from "react";
import toast from "react-hot-toast";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

import forgotImg from "../assets/undraw_code_typing_re_p8b9.svg";
import axiosInstance from "../Helper/axiosInstance";
import Layout from "../Layout/Layout";

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    })
    const submitHandler = async (events) => {
        events.preventDefault();
        if(!data.email) {
            toast.error("Email is required to reset password.");
            return;
        }
        if (!data.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            toast.error("Invalid Email Id");
            return;
        }
        try {
            let res = axiosInstance.post("/user/forgot-password", data);
            toast.promise(res, {
                loading: "Loading...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to send the reset link.",
            });
            res = await res;
            if(res?.data?.success) {
                setData({
                    email: "",
                })
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
  return (
    <Layout>
      <div className="bg-slate-200">
        <div className="mx-auto my-12 flex max-w-lg flex-col items-start justify-center xl:my-16 xl:min-h-[80vh] 2xl:my-20 ">
          <form
              onSubmit={submitHandler}
            className="mx-auto mt-3 flex max-w-md flex-col rounded-lg bg-white px-4 py-12 shadow sm:px-8 lg:px-12"
          >
            <img src={forgotImg} alt="" className="mx-auto my-3 sm:w-10/12" />

            <h1 className="mt-5 text-center text-xl font-bold">
              Forgot Password
            </h1>
            <p className="mb-4 mt-2 text-center text-slate-500">
              Enter your email and we will send you a link to reset password.
            </p>
            <label className="form-control w-full max-w-md" htmlFor="email">
              <div className="label">
                <span className="label-text">Your Email</span>
              </div>
              <input
                type="email"
                placeholder="Registered Email"
                name="email"
                className="input input-bordered w-full max-w-md ring-1 ring-indigo-500 focus:ring-2 focus:ring-indigo-600"
                //   onChange={changeHandler}
                onChange={(event) => setData({...data, [event.target.name]: event.target.value})}
                  value={data.email}
              />
            </label>

            <button
              type="submit"
              className="btn btn-primary mt-7 bg-indigo-600 text-lg text-white"
            >
              Submit
            </button>
            <p className="mt-5 max-w-xs text-center">
              <Link
                to={"/sign-in"}
                className="flex cursor-pointer items-center justify-center gap-1 text-indigo-500"
              >
                <IoChevronBackOutline /> <span>Back to Login</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
