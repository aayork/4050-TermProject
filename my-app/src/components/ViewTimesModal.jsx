import { useEffect, useState } from "react";

export function ViewTimesModal({ movie }) {
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    console.log("Showtime modal");
    if (movie) {
      setShowtimes(movie.showtimes);
    }
  }, [movie]);
  return (
    <div className="modal-box">
      <div>
        <h1>Current Show times</h1>
        {showtimes.map((showtime) => (
          <div className="border bg-white" key={showtime.id}>
            {showtime.date}
          </div>
        ))}
      </div>
    </div>
  );
}
