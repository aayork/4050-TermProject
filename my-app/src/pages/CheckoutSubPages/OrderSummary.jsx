import { useLocation, Link } from "react-router-dom";

export function OrderSummary() {
  // Get the passed state from the previous page
  const location = useLocation();
  const { selectedSeats, seatTypes, selectedShowtime } = location.state;

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      <h2 className="text-lg font-semibold mb-4">
        Showtime: {selectedShowtime}
      </h2>

      <h2 className="text-lg font-semibold mb-4">Selected Seats and Types:</h2>
      {selectedSeats.length > 0 ? (
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat} className="mb-2">
              Seat {seat} - {seatTypes[seat] || "Adult"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No seats selected.</p>
      )}
    </div>
  );
}
