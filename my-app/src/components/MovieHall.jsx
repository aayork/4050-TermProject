import { useState } from "react";
import { Link } from "react-router-dom"; // Example usage of React Router

export function MovieHall() {
  const rows = 5; // Example number of rows
  const columns = 8; // Example number of columns
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeatSelection = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>
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
                  isSelected ? "bg-green-500" : "bg-gray-300"
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

      {/* Example usage of React Router */}
      <Link to="/checkout" className="btn mt-5">
        Proceed to Checkout
      </Link>
    </div>
  );
}
