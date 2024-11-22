import { useState, useEffect } from "react";
import { ManageMovies } from "./ManageSubPages/ManageMovies";
import { ManageUsers } from "./ManageSubPages/ManageUsers";
import { ManagePromos } from "./ManageSubPages/ManagePromos";
import { ManageShowtimes } from "./ManageSubPages/ManageShowtimes";
import { getUser } from "../utils/API";
import { Loading } from "../components/Loading";

export function Admin() {
  const [isAdmin, setAdmin] = useState(false);
  const [selectedTab, setSelectedTab] = useState("movies");
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      const authToken = localStorage.getItem("auth");
      if (authToken) {
        try {
          const user = await getUser();
          setAdmin(user.movie_profile.status === "admin");
        } catch (error) {
          console.error("Error fetching user:", error);
          setAdmin(false);
        }
      } else {
        setAdmin(false);
      }
      setLoading(false);
    };

    checkAuthAndFetchUser();

    window.addEventListener("storage", checkAuthAndFetchUser);

    return () => {
      window.removeEventListener("storage", checkAuthAndFetchUser);
    };
  }, []);

  if (loading) {
    return <Loading message="Checking Permissions" />;
  }

  return (
    <div>
      {isAdmin ? (
        <div className="w-full">
          <div role="tablist" className="tabs tabs-bordered w-full flex">
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab flex-1"
              aria-label="Manage Movies"
              checked={selectedTab === "movies"}
              onChange={() => handleTabChange("movies")}
            />
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab flex-1"
              aria-label="Manage Users"
              checked={selectedTab === "users"}
              onChange={() => handleTabChange("users")}
            />
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab flex-1"
              aria-label="Manage Promotions"
              checked={selectedTab === "promos"}
              onChange={() => handleTabChange("promos")}
            />
            <input
              type="radio"
              name="my_tabs"
              role="tab"
              className="tab flex-1"
              aria-label="Manage Showtimes"
              checked={selectedTab === "showtimes"}
              onChange={() => handleTabChange("showtimes")}
            />
          </div>

          {selectedTab === "movies" && (
            <div className="py-2 px-4">
              <ManageMovies />
            </div>
          )}
          {selectedTab === "showtimes" && (
            <div className="py-2 px-4">
              <ManageShowtimes />
            </div>
          )}
          {selectedTab === "users" && (
            <div className="py-2 px-4">
              <ManageUsers />
            </div>
          )}
          {selectedTab === "promos" && (
            <div className="py-2 px-4">
              <ManagePromos />
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="card flex justify-center">
            <div className="font-semibold text-xl">
              You do not have access to this page
            </div>
            <br />
            <div className="self-center">
              Click{" "}
              <a className="text-blue-700 underline" href="/">
                here
              </a>{" "}
              to return home
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
