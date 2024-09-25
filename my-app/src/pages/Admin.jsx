import { useState } from "react";
import { ManageMovies } from "./ManageSubPages/ManageMovies";
import { ManageEmployees } from "./ManageSubPages/ManageEmployees";
import { ManagePromos } from "./ManageSubPages/ManagePromos";

export function Admin() {
  const [isAdmin, setAdmin] = useState(true);
  const [selectedTab, setSelectedTab] = useState("movies");

  const toggleAdmin = () => {
    setAdmin(!isAdmin);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div>
        <button onClick={toggleAdmin}>Click to turn admin on/off</button>
      </div>
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
              aria-label="Manage Employees"
              checked={selectedTab === "employees"}
              onChange={() => handleTabChange("employees")}
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
          </div>

          {selectedTab === "movies" && (
            <div className="p-6">
              <ManageMovies />
            </div>
          )}
          {selectedTab === "employees" && (
            <div className="p-6">
              <ManageEmployees />
            </div>
          )}
          {selectedTab === "promos" && (
            <div className="p-6">
              <ManagePromos />
            </div>
          )}
        </div>
      ) : (
        <div>You do not have access to this page</div>
      )}
    </div>
  );
}
