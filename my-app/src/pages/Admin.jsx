import { useState, useEffect } from "react";
import { ManageMovies } from "./ManageSubPages/ManageMovies";
import { ManageUsers } from "./ManageSubPages/ManageUsers";
import { ManagePromos } from "./ManageSubPages/ManagePromos";
import { validateAdmin } from "../utils/API";
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
          setAdmin(await validateAdmin());
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
          <h1 className="text-3xl font-semibold mb-6">Admin dashboard</h1>
          <div
            role="tablist"
            className="flex w-full gap-1 rounded-2xl border border-base-300 bg-white p-1.5 font-sans"
          >
            {[
              ["movies", "Manage Movies"],
              ["users", "Manage Users"],
              ["promos", "Manage Pricing"],
            ].map(([tab, label]) => (
              <button
                key={tab}
                role="tab"
                aria-selected={selectedTab === tab}
                onClick={() => handleTabChange(tab)}
                className={`flex-1 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  selectedTab === tab
                    ? "bg-monkey-green text-monkey-white shadow-sm"
                    : "text-monkey-ink/70 hover:bg-base-200 hover:text-monkey-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {selectedTab === "movies" && (
            <div className="pt-6">
              <ManageMovies />
            </div>
          )}
          {selectedTab === "users" && (
            <div className="pt-6">
              <ManageUsers />
            </div>
          )}
          {selectedTab === "promos" && (
            <div className="pt-6">
              <ManagePromos />
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-base-300 bg-white p-10 text-center">
          <h1 className="text-2xl font-semibold">
            You do not have access to this page
          </h1>
          <a className="btn btn-primary mt-6" href="/">
            Return home
          </a>
        </div>
      )}
    </div>
  );
}
