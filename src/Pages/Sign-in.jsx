import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout";
import { loginAccount } from "../Redux/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logindata, setlogindata] = useState({
    username: "",
    password: "",
  });
  const changeHandler = (event) => {
    const { name, value } = event.target;

    // Update the signupData state based on the input field name
    setlogindata({
      ...logindata,
      [name]: value, // Dynamically update the state key based on the input name
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!logindata.username || !logindata.password) {
      toast.error("Please fill all the fields.");
      return;
    }
    const res = await dispatch(loginAccount(logindata));
    // redirect to home page if true
    if (res?.payload?.success) {
      navigate("/");

      // clearing the login inputs
      setlogindata({
        username: "",
        password: "",
      });
    }
  };
  return (
    <Layout>
      <div className="bg-slate-200">
      <div className="mx-auto my-12 xl:my-16 2xl:my-20 xl:min-h-[80vh] flex max-w-lg flex-col items-start justify-center ">
        <h1 className="my-4 text-center text-3xl font-bold text-indigo-600 sm:text-4xl md:text-5xl mx-auto">
          Welcome to Alcodemy Blog
        </h1>
        <p className="mx-auto mb-5 text-center text-xl">
          Log In to access and manage your account.
        </p>
        <form
          onSubmit={submitHandler}
          className="mx-auto flex flex-col gap-y-6 bg-white px-4 sm:px-8 lg:px-12 py-12 mt-3 shadow rounded-md"
        >
          <label className="form-control w-full max-w-md" htmlFor="username">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Your username"
              name="username"
              className="input input-bordered w-full max-w-md ring-1 ring-indigo-500 focus:ring-2 focus:ring-indigo-600"
              onChange={changeHandler}
              value={logindata.username}
            />
          </label>

          <label className="form-control w-full max-w-md" htmlFor="password">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Your password"
              name="password"
              className="input input-bordered w-full max-w-md ring-1 ring-indigo-500 focus:ring-2 focus:ring-indigo-600"
              onChange={changeHandler}
              value={logindata.password}
            />
          </label>

          <button
            type="submit"
            className="btn btn-primary mt-7 bg-indigo-600 text-lg text-white"
          >
            Log In
          </button>
          <p className="mt-3 max-w-xs">
            Don&apos;t have an account ?&nbsp;{" "}
            <Link to={"/sign-up"} className="cursor-pointer text-indigo-500">
              Create Account
            </Link>
          </p>
        </form>
      </div>
      </div>
    </Layout>
  );
};

export default SignIn;
