
import { Route,Routes } from "react-router-dom";

import About from "./Pages/About";
import Contact from "./Pages/Contact";
import  HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";
import { PrivacyPolicy } from "./Pages/Privacy-Policy";
import SignUp from "./Pages/Sign-up";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route path="/about" element={<About/>} />

        <Route path="/sign-up" element={<SignUp/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
