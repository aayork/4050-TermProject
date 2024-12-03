import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrder, getUser } from "../../utils/API";

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, seatTypes, startTime, seatIdMappings } =
    location.state;

  const [userId, setUserId] = useState(null);
  const [payment, setPayment] = useState({
    user: userId,
    cardNumber: "",
    CVV: "",
    expirationDate: "",
    firstName: "",
    lastName: "",
  });

  const [billingAddress, setBillingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser("auth");
        if (user?.id) {
          setUserId(user.id);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      setPayment((prevPayment) => ({
        ...prevPayment,
        user: userId, // Update the userId in payment state
      }));
    }
  }, [userId]);

  const seatPrices = {
    Adult: 12,
    Child: 9,
    Senior: 9,
  };

  const totalPrice = selectedSeats.reduce((total, seat) => {
    const type = seatTypes[seat] || "Adult";
    return total + seatPrices[type];
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "state", "zip"].includes(name)) {
      setBillingAddress((prev) => ({ ...prev, [name]: value }));
    } else {
      setPayment((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleConfirm = async () => {
    const tickets = selectedSeats.map((seatLabel) => ({
      seat: seatIdMappings[seatLabel],
      type: (seatTypes[seatLabel] || "Adult").toLowerCase(),
    }));

    const purchaseDate = new Date().toISOString().split("T")[0];
    const discountPercentage = 0;

    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    if (tickets.length === 0) {
      console.error("Tickets cannot be empty!");
      return;
    }

    const orderData = {
      discountPercentage,
      totalPrice,
      userId,
      purchaseDate,
      tickets,
      payment,
      billingAddress,
    };

    console.log("Request data:", JSON.stringify(orderData, null, 2));

    try {
      const response = await createOrder(
        discountPercentage,
        totalPrice,
        userId,
        purchaseDate,
        tickets,
      );

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
          First Name
          <input
            type="text"
            name="firstName"
            value={payment.firstName}
            onChange={handleInputChange}
            className="grow"
            placeholder="John"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Last Name
          <input
            type="text"
            name="lastName"
            value={payment.lastName}
            onChange={handleInputChange}
            className="grow"
            placeholder="Doe"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Card Number
          <input
            type="text"
            name="cardNumber"
            value={payment.cardNumber}
            onChange={handleInputChange}
            className="grow"
            placeholder="1234 5678 9012 3456"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Expiration Date
          <input
            type="text"
            name="expirationDate"
            value={payment.expirationDate}
            onChange={handleInputChange}
            className="grow"
            placeholder="MM/YY"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          CVV
          <input
            type="text"
            name="CVV"
            value={payment.CVV}
            onChange={handleInputChange}
            className="grow"
            placeholder="123"
          />
        </label>

        <h2 className="text-lg font-semibold mt-4">Billing Address</h2>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Street
          <input
            type="text"
            name="street"
            value={billingAddress.street}
            onChange={handleInputChange}
            className="grow"
            placeholder="123 Main St"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          City
          <input
            type="text"
            name="city"
            value={billingAddress.city}
            onChange={handleInputChange}
            className="grow"
            placeholder="Athens"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          State
          <input
            type="text"
            name="state"
            value={billingAddress.state}
            onChange={handleInputChange}
            className="grow"
            placeholder="GA"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          ZIP
          <input
            type="text"
            name="zip"
            value={billingAddress.zip}
            onChange={handleInputChange}
            className="grow"
            placeholder="30605"
          />
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
