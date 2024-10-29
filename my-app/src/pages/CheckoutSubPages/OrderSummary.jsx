import { Link, useLocation } from "react-router-dom";

export function OrderSummary() {
  const location = useLocation();
  const {
    selectedSeats = [],
    seatTypes = {},
    selectedShowtime = "",
  } = location.state || {};

  // Define pricing for each seat type
  const seatPrices = {
    Adult: 12,
    Child: 9,
    Senior: 9,
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>

      <h2 className="text-lg font-semibold mb-4">
        Showtime: {selectedShowtime}
      </h2>

      <h2 className="text-lg font-semibold mb-4">Selected Seats and Types:</h2>
      {selectedSeats.length > 0 ? (
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat} className="mb-2">
              Seat {seat} - {seatTypes[seat] || "Adult"} (
              {seatPrices[seatTypes[seat] || "Adult"]})
            </li>
          ))}
        </ul>
      ) : (
        <p>No seats selected.</p>
      )}

      {selectedSeats.map((seat) => (
        <div key={seat}>
          <button className="btn mb-2" onClick={() => deleteSeat(seat)}>
            Delete
          </button>
        </div>
      ))}

      <Link to="/" className="btn mt-5 p-2">
        Back to Movie Selection
      </Link>
    </div>
  );
}
