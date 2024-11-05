import { useState, useEffect, useMemo } from "react";

export function EditPromoModal({ onClose, onSave, promo }) {
  // Helper function to format dates as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const initForm = useMemo(
    () => ({
      name: "",
      code: "",
      discountPercentage: 0,
      startDate: formatDate(Date.now()),
      endDate: formatDate(Date.now()),
    }),
    []
  );
  const [promoDetails, setPromoDetails] = useState(initForm);

  useEffect(() => {
    if (promo) {
      setPromoDetails({
        ...promo,
        startDate: formatDate(promo.startDate),
        endDate: formatDate(promo.endDate),
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

  const close = (event) => {
    event.preventDefault();
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
              name="discountPercentage"
              className="grow"
              value={promoDetails.discountPercentage}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Start Date :
            <input
              type="date"
              className="grow"
              value={promoDetails.startDate}
              name="startDate"
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            End Date :
            <input
              type="date"
              className="grow"
              name="endDate"
              value={promoDetails.endDate}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-action mt-0">
          <button
            className="btn btn-secondary btn-sm mx-2 text-monkey-white text-white"
            onClick={close}
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
