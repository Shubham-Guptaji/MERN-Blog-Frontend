
import { Route,Routes } from "react-router-dom";

import About from "./Pages/About";
import Contact from "./Pages/Contact";
import  HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import { PrivacyPolicy } from "./Pages/Privacy-Policy";
import SignIn from "./Pages/Sign-in";
import SignUp from "./Pages/Sign-up";
import AuthToken from "./utils/AuthToken";

function App() {

  return (
    <AuthToken>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/about" element={<About/>} />

        <Route path="/sign-up" element={<SignUp/>} />


        <Route path="/sign-in" element={<SignIn/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthToken>
  );
}

export default App;
