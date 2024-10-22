import { useState, useEffect, useMemo } from "react";

export function EditPromoModal({ onClose, onSave, promo }) {
  const initForm = useMemo(
    () => ({
      name: "",
      code: "",
      discount: "",
      start_date: "",
      end_date: "",
    }),
    []
  );
  const [promoDetails, setPromoDetails] = useState(initForm);

  useEffect(() => {
    if (promo) {
      setPromoDetails({
        ...promo,
        start_date: new Date(promo.start_date),
        end_date: new Date(promo.end_date),
      });
    } else {
      setPromoDetails(initForm);
    }
  }, [promo, initForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromoDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(promoDetails);
    onClose();
  };

  return (
    <div className="modal-box">
      <h1 className="font-semibold text-lg">
        {promo ? "Update Promo" : "Add Promo"}
      </h1>
      <div className="border border-monkey-green"></div>
      <form method="dialog" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-2">
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Name :
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              value={promoDetails.name}
              name="name"
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Code :
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              value={promoDetails.code}
              name="code"
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Discount :
            <input
              type="number"
              max="100"
              min="0"
              name="discount"
              className="grow"
              value={promoDetails.discount}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Start Date :
            <input
              type="date"
              className="grow"
              value={promoDetails.start_date}
              name="start_date"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            End Date :
            <input
              type="date"
              className="grow"
              name="end_date"
              value={promoDetails.end_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-action mt-0">
          <button
            className="btn btn-secondary btn-sm mx-2 text-monkey-white text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={handleSubmit}
          >
            {promo ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
