import { useEffect, useState } from "react";
import { ViewDeleteTimes } from "./ViewDeleteTimes";
import { CreateShowtimes } from "./CreateShowtimes";

export function ViewTimesModal({ movie, onUpdate }) {
  const [selectedTab, setSelectedTab] = useState("viewTimes");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="modal-box p-4 max-w-6xl min-h-40 bg-transparent shadow-none">
      <button
        onClick={() => document.getElementById("viewTimesModal").close()}
        className="btn btn-xs btn-circle absolute end-1 top-1"
      >
        ✕
      </button>
      <div className="p-2 min-h-40 w-full rounded-lg bg-monkey-white">
        <div role="tablist" className="tabs tabs-bordered w-full flex">
          <input
            type="radio"
            name="showtime_tabs"
            role="tab"
            className="tab flex-1"
            aria-label="View Times"
            checked={selectedTab === "viewTimes"}
            onChange={() => handleTabChange("viewTimes")}
          />
          <input
            type="radio"
            name="showtime_tabs"
            role="tab"
            className="tab flex-1 "
            aria-label="Create Showtimes"
            checked={selectedTab === "createShowtimes"}
            onChange={() => handleTabChange("createShowtimes")}
          />
        </div>
        <div>
          {selectedTab === "viewTimes" && (
            <div className="mt-2">
              <ViewDeleteTimes movie={movie} onUpdate={onUpdate} />
            </div>
          )}
          {selectedTab === "createShowtimes" && (
            <div className="mt-2">
              <CreateShowtimes movie={movie} onUpdate={onUpdate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
