import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Payment() {
  // Get the passed state from the previous page
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const { selectedSeats, seatTypes, selectedShowtime } = location.state;

  // Define pricing for each seat type
  const seatPrices = {
    Adult: 12,
    Child: 9,
    Senior: 9,
  };

  // Calculate the total price
  const totalPrice = selectedSeats.reduce((total, seat) => {
    const type = seatTypes[seat] || "Adult"; // Default to Adult if type is not found
    return total + seatPrices[type];
  }, 0);

  const handleConfirm = () => {
    // Navigate to the summary page with the necessary data
    navigate("/summary", {
      state: { selectedSeats, seatTypes, selectedShowtime }, // Pass the data to the summary page
    });
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="text-lg font-semibold mt-4">Total: ${totalPrice}</h2>

      <form className="flex flex-col w-full max-w-md">
        {/* Name Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Name
          <input type="text" className="grow" placeholder="John Doe" />
        </label>

        {/* Email Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Email
          <input
            type="email"
            className="grow"
            placeholder="john.doe@example.com"
          />
        </label>

        {/* Card Number Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Card Number
          <input
            type="text"
            className="grow"
            placeholder="1234 5678 9012 3456"
          />
        </label>

        {/* Expiration Date Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Expiration Date
          <input type="text" className="grow" placeholder="MM/YY" />
        </label>

        {/* CVV Input */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          CVV
          <input type="text" className="grow" placeholder="123" />
        </label>

        {/* Optional Note */}
        <label className="input input-bordered flex items-center gap-2 mb-4">
          <input type="text" className="grow" placeholder="Add a note" />
          <span className="badge badge-info bg-monkey-yellow text-black">
            Optional
          </span>
        </label>

        <div className="flex flex-row justify-center">
          <button
            type="button"
            onClick={handleConfirm}
            className="btn mt-5 p-2 m-2"
          >
            Confirm
          </button>
          <Link to="/" className="btn mt-5 p-2 m-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
