import { useEffect, useState } from "react";

export function ViewTimesModal({ movie }) {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    if (movie) {
      console.log("Set showtimes");
      setShowtimes(movie.showtimes);
    }
  }, [movie]);
  return (
    <div className="modal-box">
      <div>
        <h1>Current Show times</h1>
        <div className="flex flex-wrap gap-2">
          {showtimes.map((showtime) => (
            <div className="border bg-white rounded" key={showtime.id}>
              {showtime.date}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
