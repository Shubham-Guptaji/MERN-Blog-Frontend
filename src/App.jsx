
import { Route,Routes } from "react-router-dom";

import Contact from "./Pages/Contact";
import  HomePage from "./Pages/HomePage";
import NotFound from "./Pages/NotFound";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<Contact/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
