import { useState } from "react";
import { Link } from "react-router-dom";

export function MovieHall() {
  const rows = 8;
  const columns = 12;

  // State to handle selected seats
  const [selectedSeats, setSelectedSeats] = useState([]);

  // State to handle showtime selection
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const showtimes = ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"];

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Select Showtime & Seats</h1>

      {/* Step 1: Showtimes Selection */}
      {!selectedShowtime ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Select a Showtime:</h2>
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
          {/* Step 2: Seat Selection */}
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
                return Array.from({ length: columns }).map((_, colIndex) => {
                  const seatId = `R${rowIndex + 1}-C${colIndex + 1}`;
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
                    <li key={seat}>{seat}</li>
                  ))}
                </ul>
              ) : (
                <p>No seats selected.</p>
              )}
            </div>

            {/* Proceed to Checkout */}
            <Link to="/checkout" className="btn mt-5">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
