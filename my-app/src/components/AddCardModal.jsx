import { useState } from "react";
import { createPayment } from "../utils/API";

export function AddCardModal({ onAdd, onClose, userId }) {
  const initForm = {
    user: userId,
    firstName: "",
    lastName: "",
    cardNumber: "",
    expirationDate: "",
    CVV: "",
  };
  const [cardForm, setCardForm] = useState(initForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (cardForm.cardNumber.length != 16) {
        alert("Card Number must be 16 characters");
        return;
      }

      cardForm.expirationDate = convertToDate(cardForm.expirationDate);
      const result = await createPayment(cardForm);
      console.log(result);
      onAdd();
    } catch (exception) {
      console.log(exception);
      alert(exception);
      setCardForm(initForm);
    }
  };

  const convertToDate = (dateString) => {
    try {
      const [month, year] = dateString.split("/").map(Number);
      const date = new Date(year, month - 1);
      const formattedDate = date.toISOString().split("T")[0];
      return formattedDate;
    } catch {
      alert("Error with Expiration Date Format");
    }
  };

  const handleClose = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="modal-box">
      <h3 className="font-semibold text-lg">Add Credit/Debit Card</h3>
      <div className="border border-monkey-green"></div>
      <form
        className="flex flex-wrap gap-3 w-full py-2"
        onSubmit={handleSubmit}
      >
        <label className="relative w-full flex flex-col">
          <span className="font-semibold">Name on Card</span>
          <div className="flex justify-between w-full gap-2">
            <input
              className="rounded-md peer pl-2 pr-2 w-1/2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="firstName"
              placeholder="John"
              value={cardForm.firstName}
              onChange={handleChange}
            />
            <input
              className="rounded-md peer pl-2 w-1/2 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="lastName"
              placeholder="Doe"
              value={cardForm.lastName}
              onChange={handleChange}
            />
          </div>
        </label>

        <label className="relative w-full flex flex-col">
          <span className="font-semibold">Card number</span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
            type="text"
            name="cardNumber"
            placeholder="0000000000000000"
            value={cardForm.cardNumber}
            onChange={handleChange}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </label>

        <div className="grid grid-cols-2 gap-2 w-full">
          <label className="relative flex-1 flex flex-col">
            <span className="font-semibold">Expiration date</span>
            <input
              className="rounded-md peer pl-2 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="expirationDate"
              placeholder="MM/YYYY"
              value={cardForm.expirationDate}
              onChange={handleChange}
            />
          </label>

          <label className="relative flex-1 flex flex-col">
            <span className="font-semibold">CVV</span>
            <input
              className="rounded-md peer pl-2 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="CVV"
              placeholder="000"
              value={cardForm.CVV}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="w-full flex justify-between gap-4">
          <button
            className="btn btn-sm btn-outline flex-1"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-sm text-white flex-1"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
