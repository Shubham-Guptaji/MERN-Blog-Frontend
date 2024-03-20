import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom"; // Import Link for proper navigation

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navigationItems = [
    { name: "Home", to: "/" }, // Use `to` for React Router DOM
    { name: "Recent Posts", to: "/posts" },
    { name: "About", to: "/about" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <>
      <nav className="w-full bg-indigo-600">
        <div className="container mx-auto w-full items-center justify-between px-3 text-white md:w-10/12">
          <div className="flex w-full justify-between py-2 items-center">
            {/* Logo */}
            <div className="flex items-center ">
              <span className="mr-2 text-2xl font-bold">Alcodemy Blog</span>
            </div>

            {/* Navigation links (desktop) */}
            <ul className="hidden items-center space-x-5 font-serif text-xl md:flex">
              {navigationItems.map((item) => (
                <li key={item.name} className="hover:text-gray-400">
                  <Link to={item.to} className="font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
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
                className="block px-4 py-0.5 font-serif hover:bg-gray-700"
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
      <div>{children}</div>
    </>
  );
};

export default Layout;
