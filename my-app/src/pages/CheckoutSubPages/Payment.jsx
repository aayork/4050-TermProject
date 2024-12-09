import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  createOrder,
  getUser,
  getPayments,
  deletePayment,
  getPaymentInfo,
  validatePromotion,
} from "../../utils/API";
import { PaymentCard } from "../../components/PaymentCard";

export function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, seatTypes, startTime, seatIdMappings, prices } =
    location.state;

  const [userId, setUserId] = useState(null);
  const [cardNumber, setPayment] = useState(""); // converted to int on handle input

  const [payments, setPayments] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [code, setCode] = useState(""); // Store the promo code
  const [discount, setDiscount] = useState(0); // Store the discount percentage
  const [promoMessage, setPromoMessage] = useState(""); // Store promo code validation message

  const [useSavedCard, setUseSavedCard] = useState(false); // Track if a saved card is being used

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
    const getPaymentList = async () => {
      try {
        const user = await getUser();
        console.log(user);
        if (user) {
          setUserId(user.id);
          const paymentArray = await getPayments(user.id);
          console.log(paymentArray);
          setPayments(paymentArray);
        }
      } catch (error) {
        alert(error);
      }
    };

    getPaymentList();
  }, [shouldUpdate]);

  const seatPrices = useMemo(() => {
    return {
      Adult: prices.adult_price,
      Child: prices.child_price,
      Senior: prices.senior_price,
    };
  }, [prices]);

  const totalPrice = useMemo(() => {
    return selectedSeats.reduce((total, seat) => {
      const seatType = seatTypes[seat] || "Adult";
      return total + parseFloat(seatPrices[seatType]) || 0;
    }, 0);
  }, [selectedSeats, seatPrices, seatTypes]);

  const finalPrice = useMemo(() => {
    const discountAm = (totalPrice * (discount / 100)).toFixed(2);
    const taxToAdd = parseFloat(totalPrice * prices.sales_tax);
    const priceWithExtra =
      totalPrice -
      parseFloat(discountAm) +
      parseFloat(prices.booking_fee) +
      parseFloat(taxToAdd);

    return priceWithExtra.toFixed(2);
  }, [totalPrice, prices, discount]);

  const deletePaymentCard = async (cardId) => {
    try {
      const result = await deletePayment(cardId);
      console.log(result);
      setShouldUpdate(!shouldUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const getCardInfo = async (cardId) => {
    try {
      const result = await getPaymentInfo(cardId);
      console.log("payment info", result);
      setShouldUpdate(!shouldUpdate);
      setPayment(result.card_number);
      setUseSavedCard(true); // Disable input fields when a saved card is used
    } catch (error) {
      console.log(error);
    }
  };

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
  const validatePromoCode = async (e) => {
    e.preventDefault();
    if (code == "") {
      setPromoMessage("");
    } else {
      try {
        const validPromo = await validatePromotion(code);
        setDiscount(validPromo.discountPercentage);
        setPromoMessage(
          `Promo code "${code}" applied! You get ${validPromo.discountPercentage}% off.`
        );
      } catch (error) {
        setPromoMessage(error.message);
        setDiscount(0);
      }
    }
  };

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
        tickets,
        cardNumber,
        street,
        city,
        state,
        zip
      );

      console.log("Response from backend:", response);

      navigate("/confirmation", {
        state: {
          selectedSeats,
          seatTypes,
          startTime,
          totalPrice: finalPrice,
          orderId: response.id,
        },
      });
    } catch (error) {
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

      <div className="w-64">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Subtotal: </h2>
          <span>{totalPrice}</span>
        </div>

        {discount != 0 && (
          <div className="flex justify-between items-center ">
            <h2 className="text-lg font-semibold">Discount: </h2>
            <span className="text-red-600">
              -{(totalPrice * (discount / 100)).toFixed(2)}
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Booking fee: </h2>
          <span>{prices.booking_fee}</span>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Sales Tax ({prices.sales_tax * 100}%):
          </h2>
          <span>{parseFloat(totalPrice * prices.sales_tax).toFixed(2)}</span>
        </div>

        <div className="border"></div>

        <div className="flex justify-between items-center text-xl">
          <h2 className="font-semibold">Final Total:</h2>
          <span>{finalPrice}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Saved Cards</div>
        <div className="card-content">
          {payments.map((card) => (
            <div className="w-full" key={card.id}>
              <PaymentCard
                card={card}
                onDelete={() => deletePaymentCard(card.id)}
                usable={true}
                getPaymentInfo={() => getCardInfo(card.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <form className="flex flex-col w-full max-w-md">
        <label className="input input-bordered flex items-center gap-2 mb-4">
          First Name
          <input
            type="text"
            name="firstName"
            onChange={handleInputChange}
            className="grow"
            placeholder="John"
            disabled={useSavedCard} // Disable if a saved card is used
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
            disabled={useSavedCard} // Disable if a saved card is used
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
            disabled={useSavedCard} // Disable if a saved card is used
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
            disabled={useSavedCard} // Disable if a saved card is used
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
            disabled={useSavedCard} // Disable if a saved card is used
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
        <div className="flex gap-1">
          <label className="input input-bordered flex items-center gap-2 mb-4 grow">
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
          <button
            className=" btn btn-primary text-white"
            onClick={(e) => validatePromoCode(e)}
          >
            Apply
          </button>
        </div>

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
