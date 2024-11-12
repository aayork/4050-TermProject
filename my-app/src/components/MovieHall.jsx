import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieInfo } from "./MovieInfo";

// Function to convert row index to letters (e.g., 0 -> A, 25 -> Z, 26 -> AA)
const getRowLabel = (index) => {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// Helper function to format time
const formatTime = (timeString) => {
  return new Date(timeString).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export function MovieHall({ movie }) {
  const rows = 8;
  const columns = 12;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatTypes, setSeatTypes] = useState({});

  const navigate = useNavigate();

  const showTimes = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
      const newSeatTypes = { ...seatTypes };
      delete newSeatTypes[seatId];
      setSeatTypes(newSeatTypes);
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSeatTypeChange = (seatId, type) => {
    setSeatTypes({ ...seatTypes, [seatId]: type });
  };

  // Proceed to Checkout with selected seats and types
  const proceedToCheckout = () => {
    navigate("/checkout", {
      state: {
        selectedSeats,
        seatTypes,
        selectedShowtime,
      },
    });
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-4">Movie Details</h1>
      <MovieInfo movie={movie} />
      {!selectedShowtime ? (
        <div>
          {/* Showtimes Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Showtimes</h2>
            <div className="grid gap-6">
              {movie.showtimes.map((showtime, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {showtime.movieRoom.theatre.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {showtime.movieRoom.theatre.street},{" "}
                    {showtime.movieRoom.theatre.city},{" "}
                    {showtime.movieRoom.theatre.state}{" "}
                    {showtime.movieRoom.theatre.zipcode}
                  </p>
                  <div className="flex gap-4 mb-2">
                    <span className="font-medium">
                      {formatDate(showtime.date)}
                    </span>
                    <span className="font-medium">
                      {formatTime(showtime.startTime)} -{" "}
                      {formatTime(showtime.endTime)}
                    </span>
                  </div>
                  <p className="text-gray-600">
                    Room {showtime.movieRoom.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/*
          <div className="flex space-x-4">
            {showTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedShowtime(time)}
                className="btn btn-primary"
              >
                {time}
              </button>
            ))}
          </div>
          */}
        </div>
      ) : (
        <>
          <div className="mt-5">
            <h2 className="text-lg font-semibold">
              Showtime Selected: {selectedShowtime}
            </h2>
            <h3 className="text-lg font-semibold mb-4 mt-3">
              Select Your Seats:
            </h3>
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(40px, 1fr))`,
                gridAutoRows: "minmax(40px, 1fr)",
              }}
            >
              {Array.from({ length: rows }).map((_, rowIndex) => {
                const rowLabel = getRowLabel(rowIndex);
                return Array.from({ length: columns }).map((_, colIndex) => {
                  const seatId = `${rowLabel}${colIndex + 1}`;
                  const isSelected = selectedSeats.includes(seatId);
                  return (
                    <button
                      key={seatId}
                      onClick={() => toggleSeatSelection(seatId)}
                      className={`btn btn-square btn-sm ${
                        isSelected ? "bg-green-500" : "bg-monkey-yellow"
                      }`}
                    >
                      {seatId}
                    </button>
                  );
                });
              })}
            </div>

            <div className="mt-5">
              <h2 className="text-lg font-semibold">Selected Seats:</h2>
              {selectedSeats.length > 0 ? (
                <ul>
                  {selectedSeats.map((seat) => (
                    <li key={seat} className="mb-3">
                      {seat}
                      <select
                        value={seatTypes[seat] || "Adult"}
                        onChange={(e) =>
                          handleSeatTypeChange(seat, e.target.value)
                        }
                        className="ml-2 p-1 border rounded"
                      >
                        <option value="Child">Child</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                      </select>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No seats selected.</p>
              )}
            </div>

            {/* Proceed to Checkout */}
            <button onClick={proceedToCheckout} className="btn mt-5">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
