import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../utils/API";

export function Payment() {
  // Get the passed state from the previous page
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, seatTypes, startTime, seatIdMappings } =
    location.state;

  // Define pricing for each seat type
  const seatPrices = {
    Adult: 12,
    Child: 9,
    Senior: 9,
  };

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const type = seatTypes[seat] || "Adult";
    return total + seatPrices[type];
  }, 0);

  const handleConfirm = async () => {
    const tickets = selectedSeats.map((seatLabel) => ({
      seat: seatIdMappings[seatLabel],
      type: (seatTypes[seatLabel] || "Adult").toLowerCase(),
    }));

    const purchaseDate = new Date().toISOString().split("T")[0];
    const user = await getUser("auth");
    const userId = user.id;
    const discountPercentage = 0;

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

    // Create the order object
    const orderData = {
      discountPercentage,
      totalPrice,
      userId,
      purchaseDate,
      tickets,
    };

    // Log the API request data in JSON format
    console.log("Request data:", JSON.stringify(orderData, null, 2));

    try {
      const response = await createOrder(
        discountPercentage,
        totalPrice,
        userId,
        purchaseDate,
        tickets
      );

      // Log the response to see what the backend returns
      console.log("Response from backend:", response);

      navigate("/summary", {
        state: {
          selectedSeats,
          seatTypes,
          startTime,
          orderId: response.id,
        },
      });
    } catch (error) {
      // Log detailed error response
      if (error.response) {
        console.error(
          "Error response from server:",
          await error.response.json()
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
