import { useState, useEffect } from "react";
import {} from "react-router-dom";
import { logout, validateAdmin } from "../utils/API";

export function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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
      window.location.reload();
      alert(response);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checkAuthToken();
    window.addEventListener("storage", checkAuthToken);

    const getUserStatus = async () => {
      try {
        return await validateAdmin();
      } catch (error) {
        alert(error);
      }
    };

    const fetchUserData = async () => {
      if (loggedIn) {
        const result = await getUserStatus();
        setIsAdmin(result);
      } else {
        setIsAdmin(false);
      }
    };

    fetchUserData();

    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, [loggedIn]);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div>
      <nav className="bg-white mb-2 mx-2 rounded-lg relative top-2 border border-gray-200 shadow-xl">
        <div className="mx-auto px-2">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <a href="/">
                  <img
                    className="h-8 w-auto text-black text-xs ml-2"
                    src="/src/assets/banana.png"
                    alt="Movie Monkey"
                  />
                </a>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-2">
                  <a
                    href="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-monkey-yellow hover:text-black"
                    aria-current="page"
                  >
                    Home
                  </a>
                  {isAdmin && (
                    <a
                      href="/admin"
                      className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-monkey-yellow hover:text-black"
                    >
                      Admin
                    </a>
                  )}
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
                        className="mt-2 mr-2 h-8 w-8 rounded-full"
                        src="https://img.icons8.com/?size=100&id=83190&format=png&color=000000"
                        alt=""
                      />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <a
                      className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-monkey-yellow hover:text-black"
                      href="/login"
                    >
                      Login
                    </a>
                    <a
                      className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-monkey-yellow hover:text-black"
                      href="/register"
                    >
                      Register
                    </a>
                  </div>
                )}
              </div>
              {dropdownOpen && (
                <div
                  className="absolute right-0 top-10 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <a
                    href="/profile"
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
