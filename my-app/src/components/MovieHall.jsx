import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Function to convert row index to letters (e.g., 0 -> A, 25 -> Z, 26 -> AA)
const getRowLabel = (index) => {
  let label = "";
  while (index >= 0) {
    label = String.fromCharCode((index % 26) + 65) + label;
    index = Math.floor(index / 26) - 1;
  }
  return label;
};

export function MovieHall() {
  const rows = 8;
  const columns = 12;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [seatTypes, setSeatTypes] = useState({});

  const navigate = useNavigate();

  const showtimes = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

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
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Movie Details</h1>
      <iframe
        width="700"
        height="450"
        src="https://www.youtube.com/embed/JNwNXF9Y6kY"
      ></iframe>
      {!selectedShowtime ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Showtimes</h2>
          <div className="flex space-x-4">
            {showtimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedShowtime(time)}
                className="btn btn-primary"
              >
                {time}
              </button>
            ))}
          </div>
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
