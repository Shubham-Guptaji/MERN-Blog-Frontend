import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link for proper navigation

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  let isLoggedIn = false;
  const toggleMenu = () => setIsOpen(!isOpen);

  const navigationItems = [
    { name: "Home", to: "/" }, // Use `to` for React Router DOM
    { name: "All Posts", to: "/posts" },
    // { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
    isLoggedIn
      ? { name: "Logout", to: "/logout" }
      : { name: "Sign In", to: "/sign-in" },
  ];
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <nav className=" sticky top-0 z-50 w-full bg-indigo-600">
        <div className="container mx-auto  items-center justify-between px-3 text-white md:w-10/12">
          <div className="flex w-full items-center justify-between py-2">
            {/* Logo */}
            <div className="flex items-center ">
              <span className="mr-2 text-2xl font-bold">Alcodemy Blog</span>
            </div>

            {/* Navigation links (desktop) */}
            <ul className="hidden items-center space-x-5 font-serif text-xl md:flex ">
              {navigationItems.map((item) => (
                <li key={item.name} className="text-base-200 hover:text-white">
                  <Link to={item.to} className="font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="m-0 cursor-pointer rounded bg-red-500 p-2 pb-1 pt-1 text-white ring-1 ring-red-600 hover:bg-red-600 hover:ring-red-700">
                {isLoggedIn ? (
                  <Link to="dashboard">Dashboard</Link>
                ) : (
                  <Link to="sign-up">Sign Up</Link>
                )}
              </li>
            </ul>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="flex focus:outline-none md:hidden "
            >
              {isOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>

          {/* Mobile menu (toggles on click) */}
          <ul
            className={`w-full transform pb-2 transition duration-300 ease-in-out md:hidden ${
              isOpen ? "block translate-y-0" : "hidden -translate-y-full"
            }`}
          >
            {navigationItems.map((item) => (
              <li
                key={item.name}
                className="block px-4 py-0.5 font-serif text-base-200 hover:text-white"
              >
                <Link
                  to={item.to}
                  className="block text-lg font-medium text-white"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {children}
      <footer className="w-full bg-indigo-600">
        <div className="container footer mx-auto items-center p-10 px-3 text-neutral-content md:w-10/12">
          <aside>
            <p className="text-3xl font-bold">Alcodemy</p>
          </aside>
          <nav>
            <h6 className="footer-title text-lg opacity-90">Navigation</h6>
            <div className="grid gap-4 md:grid-flow-col">
              {navigationItems.map((item) => (
                <li key={item.name} className="list-none hover:text-white">
                  <Link to={item.to} className="font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="list-none hover:text-white">
                <Link to={"/about"} className="font-medium">
                  About
                </Link>
              </li>
              <li className="list-none hover:text-white">
                <Link to={"/privacy-policy"} className="font-medium">
                  Privacy Policy
                </Link>
              </li>
            </div>
          </nav>
        </div>
        <hr />
        <div className="container footer footer-center mx-auto items-center px-3 pb-3 pt-3 text-neutral-content md:w-10/12">
          <aside>
            <p>Copyright © {year} - All right reserved by Alcodemy Blog</p>
          </aside>
        </div>
      </footer>
    </>
  );
};

export default Layout;
