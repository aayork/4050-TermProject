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

      {/* You can add more order details or payment summary here */}

      {/* Buttons */}
      <div className="inline-flex">
        <Link to="/" className="btn mt-5 p-2 m-2">
          Back to Movie Selection
        </Link>
        <Link to="/checkout" className="btn mt-5 p-2 m-2">
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
}
