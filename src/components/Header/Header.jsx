import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", slug: "/", show: true },
    { name: "All Posts", slug: "/all-posts", show: authStatus },
    { name: "Add Post", slug: "/add-post", show: authStatus },
  ];

  return (
    <header className="py-3 shadow-md bg-white border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="mr-4">
            <Link to="/">
              <Logo width="90px" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-4">
            {navItems.map(
              (item) =>
                item.show && (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={({ isActive }) =>
                        `px-4 py-2 rounded-lg font-medium transition ${
                          isActive
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
            )}
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {authStatus ? (
              <LogoutBtn />
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden ml-auto">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col items-center space-y-3">
              {navItems.map(
                (item) =>
                  item.show && (
                    <li key={item.name} className="w-full">
                      <NavLink
                        to={item.slug}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `block w-full text-center px-4 py-2 rounded-lg font-medium transition ${
                            isActive
                              ? "text-blue-700 bg-blue-50"
                              : "text-gray-700 hover:bg-gray-100"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  )
              )}
              <li className="w-full">
                {authStatus ? (
                  <div className="text-center">
                    <LogoutBtn />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/login");
                      }}
                      className="w-full px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate("/signup");
                      }}
                      className="w-full px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;

