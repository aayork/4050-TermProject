import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createOrder, getUser, getPromos } from "../../utils/API";

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [promos, setPromos] = useState([]);
  const { selectedSeats, seatTypes, startTime, seatIdMappings } =
    location.state;

  const [userId, setUserId] = useState(null);
  const [cardNumber, setPayment] = useState(""); // converted to int on handle input

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [code, setCode] = useState(""); // Store the promo code
  const [discount, setDiscount] = useState(0); // Store the discount percentage
  const [promoMessage, setPromoMessage] = useState(""); // Store promo code validation message

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
    const fetchPromos = async () => {
      try {
        const promos = await getPromos();
        setPromos(promos);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };
    fetchPromos();
  }, []);

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
    if (name === "street") {
      setStreet(value);
    } else if (name === "city") {
      setCity(value);
    } else if (name === "state") {
      setState(value);
    } else if (name === "zip") {
      setZip(value);
    } else if (name === "code") {
      setCode(value); // Update the promo code
    } else if (name === "cardNumber") {
      const sanitizedValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      setPayment(sanitizedValue ? parseInt(sanitizedValue, 10) : 0); // Update the card number
    }
  };

  // Check the promo code when it changes
  useEffect(() => {
    const validatePromoCode = () => {
      const currentDate = new Date();

      // Find the promo that matches the entered code and is valid based on dates
      const validPromo = promos.find(
        (promo) =>
          promo.code === code &&
          new Date(promo.startDate) <= currentDate &&
          new Date(promo.endDate) >= currentDate,
      );

      if (validPromo) {
        setDiscount(validPromo.discountPercentage);
        setPromoMessage(
          `Promo code "${code}" applied! You get ${validPromo.discountPercentage}% off.`,
        );
      } else {
        setDiscount(0);
        setPromoMessage(`Invalid promo code or expired.`);
      }
    };

    validatePromoCode();
  }, [code, promos]);

  const handleConfirm = async () => {
    const tickets = selectedSeats.map((seatLabel) => ({
      seat: seatIdMappings[seatLabel],
      type: (seatTypes[seatLabel] || "Adult").toLowerCase(),
    }));

    const purchaseDate = new Date().toISOString().split("T")[0];

    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    if (tickets.length === 0) {
      console.error("Tickets cannot be empty!");
      return;
    }

    // Apply discount to the total price
    const finalPrice = totalPrice - (totalPrice * discount) / 100;

    const orderData = {
      discountPercentage: discount,
      totalPrice: finalPrice,
      userId,
      purchaseDate,
      tickets,
      cardNumber: cardNumber,
      street: street,
      city: city,
      state: state,
      zip: zip,
    };

    console.log("Request data:", JSON.stringify(orderData, null, 2));

    try {
      const response = await createOrder(
        discount,
        finalPrice,
        userId,
        purchaseDate,
        cardNumber,
        tickets,
      );

      console.log("Response from backend:", response);

      navigate("/confirmation", {
        state: {
          selectedSeats,
          seatTypes,
          startTime,
          totalPrice,
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

      <h2 className="text-lg font-semibold mt-4">
        Total: ${totalPrice - (totalPrice * discount) / 100}
      </h2>

      <form className="flex flex-col w-full max-w-md">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          First Name
          <input
            type="text"
            name="firstName"
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
            value={cardNumber}
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
            onChange={handleInputChange}
            className="grow"
            placeholder="MM/YYYY"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          CVV
          <input
            type="text"
            name="CVV"
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
            value={street}
            onChange={handleInputChange}
            className="grow"
            placeholder="123 Milledge Ave"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          City
          <input
            type="text"
            name="city"
            value={city}
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
            value={state}
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
            value={zip}
            onChange={handleInputChange}
            className="grow"
            placeholder="30605"
          />
        </label>

        <h2 className="text-lg font-semibold mt-4">Promotions</h2>
        <label className="input input-bordered flex items-center gap-2 mb-4">
          Promo Code
          <input
            type="text"
            name="code"
            value={code}
            onChange={handleInputChange}
            className="grow"
            placeholder="WELCOME30"
          />
        </label>

        {promoMessage && (
          <div className="text-sm text-red-500 mt-2">{promoMessage}</div> // Display promo message
        )}

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
