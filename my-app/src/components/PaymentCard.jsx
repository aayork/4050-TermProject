export function PaymentCard({ card, onDelete, usable, getPaymentInfo }) {
  return (
    <div className="card border-monkey-green border my-2 p-4 shadow-lg flex flex-row items-center justify-between">
      <div className="w-4/5">
        <div className="card-title font-semibold text-lg mb-2">
          {card.firstName} {card.lastName}
          {new Date(card.expirationDate) < new Date() && (
            <span className="text-red-500">(Card Expired)</span>
          )}
        </div>
        <div>
          <div>
            <span className="font-semibold">Card Number:</span>{" "}
            {card.maskedCardNumber}
          </div>
          <div>
            <span className="font-semibold text-black">Expiration Date:</span>{" "}
            {card.expirationDate}
          </div>
        </div>
      </div>
      {/* Button Section */}
      <div className="w-1/5 flex justify-end">
        {usable ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={getPaymentInfo}
          >
            Use
          </button>
        ) : (
          <button className="" onClick={onDelete}>
            <img src="src/assets/trash-can.svg" alt="Delete" width="30px" />
          </button>
        )}
      </div>
    </div>
  );
}
