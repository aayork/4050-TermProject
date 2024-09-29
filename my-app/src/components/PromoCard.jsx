import PropTypes from "prop-types";

export function PromoCard({ promo }) {
  const name = promo.name;
  const code = promo.code;
  const discount = promo.discount;
  const startDate = promo.startDate;
  const endDate = promo.endDate;

  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
        <h2 className="font-semibold">{name}</h2>
        <h3>
          <b className="font-semibold">Code:</b> {code}
        </h3>
        <h3>
          <b className="font-semibold">Discount:</b> {discount}%
        </h3>
        <h3>
          <b className="font-semibold">Active Dates:</b> {startDate}-{endDate}
        </h3>
        <a className="btn btn-xs btn-primary w-full mt-2">Edit Promo</a>
      </div>
    </div>
  );
}

PromoCard.propTypes = {
  promo: PropTypes.shape({
    name: PropTypes.string || null,
    code: PropTypes.string || null,
    discount: PropTypes.string || null,
    startDate: PropTypes.string || null,
    endDate: PropTypes.string || null,
  }),
};
