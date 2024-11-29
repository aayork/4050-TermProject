export function PaymentCard({ card, onDelete }) {
  return (
    <div className="card border-monkey-green border my-2 p-4 shadow-lg flex flex-row items-center justify-between">
      <div className="w-4/5">
        <div className="card-title font-semibold text-lg mb-2">
          {card.firstName} {card.lastName}
          {new Date(card.expirationDate) < new Date() && (
            <span className="text-red-500">(Card Expired)</span>
          )}
        </div>
        <div className="">
          <div className="">
            <span className="font-semibold">Card Number:</span>{" "}
            {card.maskedCardNumber}
          </div>
          <div>
            <span className="font-semibold text-black">Expiration Date:</span>
            {card.expirationDate}
          </div>
        </div>
      </div>
      {/* Trash Button */}
      <div className="w-1/5 flex justify-end">
        <button className="" onClick={onDelete}>
          <img src="src/assets/trash-can.svg" alt="Delete" width="30px" />
        </button>
      </div>
    </div>
  );
}
