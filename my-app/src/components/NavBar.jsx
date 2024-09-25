import { useState, useEffect } from "react";
import {} from "react-router-dom";
import { logout } from "../utils/API";

export function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const checkAuthToken = () => {
    const authToken = localStorage.getItem("auth");
    setLoggedIn(!!authToken);
  };

  const logoutUser = async () => {
    try {
      if (dropdownOpen) {
        setDropdownOpen(false);
      }
      const response = await logout();
      window.dispatchEvent(new Event("storage"));
      alert(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checkAuthToken();

    window.addEventListener("storage", checkAuthToken);

    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="bg-monkey-green">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="src/assets/banana.png"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-monkey-white hover:bg-gray-700 hover:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                  <a
                    href="/browse"
                    className="rounded-md px-3 py-2 text-sm font-medium text-monkey-white hover:bg-gray-700 hover:text-white"
                  >
                    Browse Movies
                  </a>
                  <a
                    href="/admin"
                    className="rounded-md px-3 py-2 text-sm font-medium text-monkey-white hover:bg-gray-700 hover:text-white"
                  >
                    Admin
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                {loggedIn ? (
                  <div>
                    <button
                      type="button"
                      className="r4"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={toggleDropDown}
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="mt-2 h-8 w-8 rounded-full"
                        src="https://img.icons8.com/?size=100&id=83190&format=png&color=FFFFEC"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <a
                      className="rounded-md px-3 py-2 text-sm font-medium text-monkey-white hover:bg-gray-700 hover:text-white"
                      href="/login"
                    >
                      Login
                    </a>
                    <a
                      className="rounded-md px-3 py-2 text-sm font-medium text-monkey-white hover:bg-gray-700 hover:text-white"
                      href="/createAccount"
                    >
                      Create Account
                    </a>
                  </div>
                )}
              </div>
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-10 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={logoutUser}
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
