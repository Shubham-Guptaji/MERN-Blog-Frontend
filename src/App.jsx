import { Helmet } from "react-helmet";
import { Route, Routes } from "react-router-dom";

import NotRequireAuth from "./Components/Auth/NotRequireAuth";
import RequireAuth from "./Components/Auth/RequireAuth";
import About from "./Pages/About";
import Create from "./Pages/Blogs/Create";
import Post from "./Pages/Blogs/Post";
import Contact from "./Pages/Contact";
import Denied from "./Pages/Denied";
import ForgotPassword from "./Pages/ForgotPassword";
import HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import { PrivacyPolicy } from "./Pages/Privacy-Policy";
import ResetPassword from "./Pages/ResetPassword";
import SignIn from "./Pages/Sign-in";
import SignUp from "./Pages/Sign-up";
import TotalPosts from "./Pages/TotalPosts";
import AuthToken from "./utils/AuthToken";

function App() {
  return (
    <AuthToken>
      <Helmet>
        <title>Alcodemy Blog</title>
        <meta
          name="description"
          content="Alcodemy blog is a web based blogging website when user can read as well as create their own blog."
        />
        <meta
          name="title"
          content="Alcodemy Blog - Blog For User and By User"
        />
        <meta name="keywords" content="Alcodemy, Alcodemy Post, alcodemy, alcodemy post, blog alcodemy, alcodemy blog, blog, post" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.alcodemy.tech/" />
        <meta
          property="og:title"
          content="Alcodemy Blog - Blog For User and By User"
        />
        <meta
          property="og:description"
          content="Alcodemy blog is a web based blogging website when user can read as well as create their own blog."
        />
        <meta
          property="og:image"
          content="https://blog.alcodemy.tech/Alcodemy.png"
        />

        <meta property="twitter:card" content="Alcodemy Blog" />
        <meta property="twitter:url" content="https://blog.alcodemy.tech/" />
        <meta
          property="twitter:title"
          content="Alcodemy Blog - Blog For User and By User"
        />
        <meta
          property="twitter:description"
          content="Alcodemy blog is a web based blogging website when user can read as well as create their own blog."
        />
        <meta
          property="twitter:image"
          content="https://blog.alcodemy.tech/alcodemy.png"
        />
      </Helmet>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<TotalPosts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/denied" element={<Denied />} />

        <Route path="/posts/:url" element={<Post />} />

        <Route element={<NotRequireAuth />} >
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        
        <Route element={<RequireAuth allowedRoles={["user", "admin"]}/>} >
          <Route path="/create" element={<Create />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthToken>
  );
}

export default App;
