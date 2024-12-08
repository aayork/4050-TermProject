import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedSeats = [],
    seatTypes = {},
    selectedShowtime = "",
  } = location.state || {};

  // Create a local state to manage selected seats
  const [seats, setSeats] = useState(selectedSeats);

  useEffect(() => {
    const checkLogin = () => {
      const authToken = localStorage.getItem("auth");
      if (!authToken) {
        navigate("/");
      }
    };
    checkLogin();
  }, [navigate]);

  // Define pricing for each seat type
  const seatPrices = {
    Adult: 12,
    Child: 9,
    Senior: 9,
  };

  // Function to handle seat deletion
  const handleDeleteSeat = (seatToRemove) => {
    setSeats(seats.filter((seat) => seat !== seatToRemove));
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      <h2 className="text-lg font-semibold mb-4">Selected Seats and Types:</h2>
      {seats.length > 0 ? (
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
      ) : (
        <p>No seats selected.</p>
      )}
    </div>
  );
}
