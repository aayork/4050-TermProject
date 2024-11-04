export function PromoCard({ promo, onEdit }) {
  return (
    <div className="flex flex-col p-2 justify-between shadow-xl border border-black rounded-xl bg-white">
      <div className="">
        <h2 className="font-semibold">{promo.name}</h2>
        <h3>
          <b className="font-semibold">Code: </b> {promo.code}
        </h3>
        <h3>
          <b className="font-semibold">Discount: </b> {promo.discountPercentage}
          %
        </h3>
        <h3>
          <b className="font-semibold">Start Date: </b>
          {promo.startDate}
        </h3>
        <h3>
          <b className="font-semibold">End Date: </b>
          {promo.endDate}
        </h3>
      </div>

      <button
        onClick={onEdit}
        className="btn btn-xs btn-primary w-full mt-2 text-white"
      >
        Edit Promo
      </button>
    </div>
  );
}
