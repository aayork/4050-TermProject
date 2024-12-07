import { deleteShowtime } from "../utils/API";
import { useState, useEffect } from "react";

export function ViewDeleteTimes({ movie, onUpdate }) {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    if (movie) {
      setShowtimes(movie.showtimes);
    }
  }, [movie]);

  const deleteST = async (id) => {
    try {
      const result = await deleteShowtime(id);
      onUpdate();
      alert(result);
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (time) => {
    const options = {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(time).toLocaleString("en-US", options);
  };

  return (
    <div className="flex justify-center">
      {showtimes.length > 0 ? (
        <div className="w-full flex flex-col items-center">
          {/* <h1>Showtimes</h1> */}
          <div className="flex flex-wrap gap-2">
            {showtimes.map((showtime) => (
              <div
                className="border border-monkey-green bg-white rounded flex gap-2 text-sm p-1"
                key={showtime.id}
              >
                <div>{formatTime(showtime.startTime)}</div>
                <button onClick={() => deleteST(showtime.id)}>
                  <img
                    src="src/assets/trash-can.svg"
                    alt="Delete"
                    width="15px"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No showtimes available</div>
      )}
    </div>
  );
}
