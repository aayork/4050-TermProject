import { useState } from "react";

export function EditPromoModal({ promo }) {
  const initForm = {
    name: "",
    code: "",
    discount: "",
    start_date: "",
    end_date: "",
  };
  const [promoDetails, setPromoDetails] = useState(initForm);

  return (
    <div className="modal-box">
      <h3 className="font-semibold text-lg">Add New Promotion</h3>
      <div className="border border-monkey-green"></div>
      <form method="dialog" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-2 py-2">
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Name :
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              value={promo.name}
              name="name"
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Code :
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              value={promo.code}
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
              value={promo.discount}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Start Date :
            <input
              type="date"
              className="grow"
              value={promo.start_date}
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
              value={promo.end_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-action">
          <button
            className="btn btn-primary btn-sm mx-2 text-monkey-white"
            onClick={cancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary btn-sm text-monkey-white"
            type="submit"
            onSubmit={handleFormSubmit}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
