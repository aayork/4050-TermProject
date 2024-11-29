import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function OrderSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedSeats = [],
    seatTypes = {},
    selectedShowtime = "",
  } = location.state || {};

  useEffect(() => {
    const checkLogin = () => {
      const authToken = localStorage.getItem("auth");
      if (!authToken) {
        navigate("/");
      }
    };
    checkLogin();
  }, []);
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
    </div>
  );
}
