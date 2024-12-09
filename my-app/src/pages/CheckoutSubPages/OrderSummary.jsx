import { useLocation } from "react-router-dom";
import { useState, useMemo } from "react";

export function OrderSummary() {
  const location = useLocation();
  const { selectedSeats = [], seatTypes = {}, prices } = location.state || {};

  // Create a local state to manage selected seats
  const [seats, setSeats] = useState(selectedSeats);

  // Define pricing for each seat type
  const seatPrices = useMemo(() => {
    return {
      Adult: prices.adult_price,
      Child: prices.child_price,
      Senior: prices.senior_price,
    };
  }, [prices]);

  // Function to handle seat deletion
  const handleDeleteSeat = (seatToRemove) => {
    setSeats(seats.filter((seat) => seat !== seatToRemove));
  };

  const subtotal = useMemo(() => {
    return seats.reduce((total, seat) => {
      const seatType = seatTypes[seat] || "Adult";
      return total + parseFloat(seatPrices[seatType]) || 0;
    }, 0);
  }, [seats, seatPrices, seatTypes]);

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      <h2 className="text-lg font-semibold mb-4">Selected Seats and Types:</h2>
      <div></div>
      {seats.length > 0 ? (
        <div>
          <ul>
            {seats.map((seat) => (
              <li key={seat} className="mb-2 flex justify-between items-center">
                <span>
                  Seat {seat} - {seatTypes[seat] || "Adult"} (
                  {seatPrices[seatTypes[seat] || "Adult"]})
                </span>
                <button
                  onClick={() => handleDeleteSeat(seat)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="text-lg  flex justify-center gap-2">
            <div className="font-semibold ">Subtotal:</div>
            <div>${subtotal}</div>
          </div>
        </div>
      ) : (
        <p>No seats selected.</p>
      )}
    </div>
  );
}
