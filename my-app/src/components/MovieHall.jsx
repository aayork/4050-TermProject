import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MovieInfo } from "./MovieInfo";
import { getSeats } from "../utils/API";
import { LoginPrompt } from "./LoginPrompt";

// Function to convert row index to letters (e.g., 0 -> A, 25 -> Z, 26 -> AA)
const getColLabel = (index) => {
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
  const rows = 12;
  const columns = 8;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatTypes, setSeatTypes] = useState({});
  const [seatIdMappings, setSeatIdMappings] = useState({});
  const [firstSeatId, setFirstSeatId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [availableSeats, setAvailableSeats] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const seats = await getSeats(18); // Fetch seats
        const id = seats[0]?.id || 0;
        setFirstSeatId(id);

        // Create availability mapping
        const availabilityMap = {};
        seats.forEach((seat) => {
          availabilityMap[seat.seatID] = seat.is_available;
        });
        setAvailableSeats(availabilityMap);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    const checkLogin = () => {
      const authToken = localStorage.getItem("auth");
      setIsLoggedIn(!!authToken);
    };

    fetchFirstSeatId();
    checkLogin();
  }, []);

  const showTimes = movie.showtimes.map((showtime) => ({
    id: showtime.id,
    theatre: showtime.movieRoom.theatre.name,
    address: `${showtime.movieRoom.theatre.street}, ${showtime.movieRoom.theatre.city}, ${showtime.movieRoom.theatre.state} ${showtime.movieRoom.theatre.zipcode}`,
    date: formatDate(showtime.date),
    startTime: formatTime(showtime.startTime),
    endTime: formatTime(showtime.endTime),
  }));

  const toggleSeatSelection = (seatLabel) => {
    // Don't allow selection if seat is not available
    if (!availableSeats[seatLabel]) {
      return;
    }

    if (selectedSeats.includes(seatLabel)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatLabel));
      const newSeatTypes = { ...seatTypes };
      delete newSeatTypes[seatLabel];
      setSeatTypes(newSeatTypes);
    } else {
      setSelectedSeats([...selectedSeats, seatLabel]);
    }
  };

  const handleSeatTypeChange = (seatLabel, type) => {
    setSeatTypes({ ...seatTypes, [seatLabel]: type });
  };

  // Proceed to Checkout with selected seats and types
  const proceedToCheckout = () => {
    const startTime = selectedShowtime.startTime;
    navigate("/checkout", {
      state: {
        selectedSeats,
        seatTypes,
        startTime,
        seatIdMappings, // Pass the mappings to the checkout page
      },
    });
  };

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-4">Movie Details</h1>
      <MovieInfo movie={movie} />
      {!selectedShowtime ? (
        <div>
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Showtimes</h2>
            <div className="grid gap-6">
              {showTimes.map((showtime) => (
                <button
                  key={showtime.id}
                  onClick={() => {
                    if (isLoggedIn) {
                      setSelectedShowtime(showtime);
                    } else {
                      document.getElementById("promptLogin").showModal();
                    }
                  }}
                  className="text-left border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow hover:bg-gray-50"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {showtime.theatre}
                  </h3>
                  <p className="text-gray-600 mb-3">{showtime.address}</p>
                  <div className="flex gap-4 mb-2">
                    <span className="font-medium">{showtime.date}</span>
                    <span className="font-medium">
                      {showtime.startTime} - {showtime.endTime}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Selected Showtime: {selectedShowtime?.theatre || "Theatre"}{" "}
                {selectedShowtime?.date || "Date"}
                {" at "}
                {selectedShowtime?.startTime || "Time"}
              </h2>
              <button
                onClick={() => setSelectedShowtime(null)}
                className="btn btn-sm"
              >
                Change Showtime
              </button>
            </div>
            <h3 className="text-lg font-semibold mb-4 mt-3">
              Select Your Seats
            </h3>
            <div
              className="grid gap-2"
              style={{
                gridTemplateColumns: `repeat(${columns}, minmax(40px, 1fr))`,
                gridAutoRows: "minmax(40px, 1fr)",
              }}
            >
              {Array.from({ length: rows }).map((_, rowIndex) => {
                return Array.from({ length: columns }).map((_, colIndex) => {
                  const colLabel = getColLabel(colIndex); // Correctly using colIndex from the inner map
                  const seatLabel = `${rowIndex + 1}${colLabel}`;
                  const actualSeatId =
                    rowIndex * columns + colIndex + (firstSeatId || 0);
                  const isSelected = selectedSeats.includes(seatLabel);
                  const isAvailable = availableSeats[seatLabel];

                  // Update the seatIdMappings
                  if (!seatIdMappings[seatLabel]) {
                    setSeatIdMappings((prev) => ({
                      ...prev,
                      [seatLabel]: actualSeatId,
                    }));
                  }

                  return (
                    <button
                      key={seatLabel}
                      onClick={() => toggleSeatSelection(seatLabel)}
                      className={`btn btn-square btn-sm ${
                        isSelected
                          ? "bg-green-500"
                          : isAvailable
                          ? "bg-monkey-yellow"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={!isAvailable}
                    >
                      {seatLabel}
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
                      {seat} (Seat ID: {seatIdMappings[seat]})
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
            <button
              onClick={proceedToCheckout}
              className="btn mt-5"
              disabled={selectedSeats.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
      <dialog id="promptLogin" className="modal">
        <LoginPrompt />
      </dialog>
    </div>
  );
}
