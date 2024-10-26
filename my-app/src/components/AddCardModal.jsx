import { useState } from "react";
import { createPayment } from "../utils/API";

export function AddCardModal({ onClose }) {
  const [cardForm, setCardForm] = useState({
    card_name: "",
    card_number: "",
    expire_date: "",
    cvv: "",
  });

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
      const result = await createPayment(cardForm);
      console.log(result);
      onClose();
    } catch (exception) {
      console.log(exception);
    }
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
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
            type="text"
            name="card_name"
            placeholder="John Doe"
            value={cardForm.card_name}
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
              d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.66-5.33-4-8-4z"
            />
          </svg>
        </label>

        <label className="relative w-full flex flex-col">
          <span className="font-semibold">Card number</span>
          <input
            className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
            type="text"
            name="card_number"
            placeholder="0000 0000 0000"
            value={cardForm.card_number}
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

        <div className="grid grid-cols-2 gap-2">
          <label className="relative flex-1 flex flex-col">
            <span className="font-semibold">Expiration date</span>
            <input
              className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="expire_date"
              placeholder="MM/YYYY"
              value={cardForm.expire_date}
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
                d="M8 7V3m8 4V3m-9 8h10l-2 5H9l-2-5z"
              />
            </svg>
          </label>

          <label className="relative flex-1 flex flex-col">
            <span className="font-semibold">CVV</span>
            <input
              className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
              type="text"
              name="cvv"
              placeholder="000"
              value={cardForm.cvv}
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
                d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.66-5.33-4-8-4z"
              />
            </svg>
          </label>
        </div>

        <div className="w-full flex justify-between gap-4">
          <button className="btn btn-sm btn-outline flex-1" onClick={onClose}>
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
