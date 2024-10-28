export function PaymentCard({ card, onDelete }) {
  return (
    <div className="card border-monkey-green border my-2 p-4 shadow-lg flex flex-row items-center justify-between">
      <div className="w-3/4">
        <div className="card-title font-semibold text-lg mb-2">
          {card.firstName} {card.lastName}
        </div>
        <div className="">
          <div className="">
            <span className="font-semibold">Card Number:</span>{" "}
            {card.maskedCardNumber}
          </div>
          <div className="">
            <span className="font-semibold">Expiration Date:</span>{" "}
            {card.expirationDate}
          </div>
        </div>
      </div>
      {/* Trash Button */}
      <div className="w-1/4 flex justify-end">
        <button className="" onClick={onDelete}>
          <img src="src/assets/trash-can.svg" alt="Delete" width="30px" />
        </button>
      </div>
    </div>
  );
}
