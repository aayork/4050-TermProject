import { useLocation } from "react-router-dom";

export function OrderConfirmation() {
  const location = useLocation();
  const { selectedSeats, seatTypes, totalPrice, startTime, orderId } =
    location.state || {};

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <h2 className="text-lg font-semibold mb-4">
        Showtime: {startTime || "Not available"}
      </h2>
      <h2 className="text-lg font-semibold mb-4">
        Total: {totalPrice || "Not available"}
      </h2>
      <h2 className="text-lg font-semibold mb-4">
        Confirmation Number: {orderId || "Not available"}
      </h2>
      <h2 className="text-lg font-semibold mb-4">Selected Seats:</h2>
      {selectedSeats?.length > 0 ? (
        <ul>
          {selectedSeats.map((seat) => (
            <li key={seat} className="mb-2">
              Seat {seat}
            </li>
          ))}
        </ul>
      ) : (
        <p>No seats selected.</p>
      )}
    </div>
  );
}
