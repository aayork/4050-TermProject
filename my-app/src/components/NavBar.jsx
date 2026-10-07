import { useState, useEffect } from "react";
import { CircleUserRound } from "lucide-react";
import { logout, validateAdmin } from "../utils/API";
import banana from "../assets/banana.png";

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

  // NavBar renders outside the Router, so read the path directly
  const currentPath = window.location.pathname;
  const navLink = (href) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      currentPath === href || (href !== "/" && currentPath.startsWith(href))
        ? "bg-monkey-green text-monkey-white"
        : "text-monkey-ink/70 hover:bg-monkey-yellow/40 hover:text-monkey-ink"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-base-300/80 bg-monkey-white/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2">
            <img className="h-8 w-auto" src={banana} alt="" />
            <span className="font-serif text-xl font-semibold tracking-tight">
              Movie Monkey
            </span>
          </a>
          <div className="hidden items-center gap-1 font-sans sm:flex">
            <a href="/" className={navLink("/")}>
              Home
            </a>
            <a href="/search" className={navLink("/search")}>
              Search
            </a>
            {isAdmin && (
              <a href="/admin" className={navLink("/admin")}>
                Admin
              </a>
            )}
          </div>
        </div>

        <div className="relative font-sans">
          {loggedIn ? (
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full text-monkey-green transition-colors hover:bg-monkey-yellow/40"
              id="user-menu-button"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              onClick={toggleDropDown}
            >
              <span className="sr-only">Open user menu</span>
              <CircleUserRound className="h-7 w-7" strokeWidth={1.75} />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <a
                className="rounded-full px-3 py-1.5 text-sm font-medium text-monkey-ink/70 transition-colors hover:text-monkey-ink"
                href="/login"
              >
                Log in
              </a>
              <a className="btn btn-primary btn-sm rounded-full px-4" href="/register">
                Sign up
              </a>
            </div>
          )}
          {dropdownOpen && (
            <div
              className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-base-300 bg-white py-1 shadow-lg"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              tabIndex="-1"
            >
              {/* Page links are hidden in the bar on mobile, so repeat them here */}
              <div className="border-b border-base-300 pb-1 sm:hidden">
                <a href="/" className="block px-4 py-2 text-sm hover:bg-base-200" role="menuitem">
                  Home
                </a>
                <a href="/search" className="block px-4 py-2 text-sm hover:bg-base-200" role="menuitem">
                  Search
                </a>
                {isAdmin && (
                  <a href="/admin" className="block px-4 py-2 text-sm hover:bg-base-200" role="menuitem">
                    Admin
                  </a>
                )}
              </div>
              <a
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-base-200"
                role="menuitem"
                tabIndex="-1"
                id="user-menu-item-0"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-error hover:bg-base-200"
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
      </nav>
    </header>
  );
}
