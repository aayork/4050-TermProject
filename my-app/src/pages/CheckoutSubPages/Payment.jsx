import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPromos, createOrder, getUser } from "../../utils/API";

export function Payment() {
  // Get the passed state from the previous page
  const location = useLocation();
  const navigate = useNavigate();
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

  const handleConfirm = async () => {
    // Create tickets array from selected seats and their types
    const tickets = selectedSeats.map((seatId) => ({
      seat: 2, // Ensure seatId is the seat's integer ID (update to use the correct seat ID)
      type: (seatTypes[seatId] || "Adult").toLowerCase(), // Ensure type matches the backend's enum
    }));

    const purchaseDate = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
    const user = await getUser("auth"); // Use `await` correctly outside of the `const` declaration
    const userId = user.id;
    const discountPercentage = 0;
    console.log("User:", user);

    // Log the data you're going to send
    console.log("Payload for order creation:");
    console.log("Discount Percentage:", discountPercentage);
    console.log("Total Price:", totalPrice);
    console.log("User ID:", userId);
    console.log("Purchase Date:", purchaseDate);
    console.log("Tickets:", tickets);

    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    if (!totalPrice) {
      console.error("Total price is missing!");
      return;
    }
    if (tickets.length === 0) {
      console.error("Tickets cannot be empty!");
      return;
    }

    try {
      const response = await createOrder(
        discountPercentage,
        totalPrice,
        userId,
        purchaseDate,
        tickets,
      );

      // Log the response to see what the backend returns
      console.log("Response from backend:", response);

      navigate("/summary", {
        state: {
          selectedSeats,
          seatTypes,
          selectedShowtime,
          orderId: response.id,
        },
      });
    } catch (error) {
      // Log detailed error response
      if (error.response) {
        console.error(
          "Error response from server:",
          await error.response.json(),
        );
      } else {
        console.error("Error creating order:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <h2 className="text-lg font-semibold mt-4">Total: ${totalPrice}</h2>

      <form className="flex flex-col w-full max-w-md">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Name
          <input type="text" className="grow" placeholder="John Doe" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          Email
          <input
            type="email"
            className="grow"
            placeholder="john.doe@example.com"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          Card Number
          <input
            type="text"
            className="grow"
            placeholder="1234 5678 9012 3456"
          />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          Expiration Date
          <input type="text" className="grow" placeholder="MM/YY" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          CVV
          <input type="text" className="grow" placeholder="123" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mb-4">
          Promo Code
          <input type="text" className="grow" placeholder="WELCOME30" />
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
