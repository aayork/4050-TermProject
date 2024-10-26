export function PromoCard({ promo, onEdit }) {
  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
        <h2 className="font-semibold">{promo.name}</h2>
        <h3>
          <b className="font-semibold">Code: </b> {promo.code}
        </h3>
        <h3>
          <b className="font-semibold">Discount: </b> {promo.discount}%
        </h3>
        <h3>
          <b className="font-semibold">Start Date: </b>
          {promo.startDate.toLocaleDateString("en-US")}
        </h3>
        <h3>
          <b className="font-semibold">End Date: </b>
          {promo.endDate.toLocaleDateString("en-US")}
        </h3>

        <button
          onClick={onEdit}
          className="btn btn-xs btn-primary w-full mt-2 text-white"
        >
          Edit Promo
        </button>
      </div>
    </div>
  );
}
