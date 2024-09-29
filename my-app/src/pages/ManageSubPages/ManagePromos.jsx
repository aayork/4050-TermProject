import { useState } from "react";
import { PromoCard } from "../../components/PromoCard";

export function ManagePromos() {
  const [formState, setFormState] = useState({
    name: "",
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
  });

  const cancel = async (event) => {
    event.preventDefault();
    document.getElementById("addMovieModal").close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formState);
  };

  const halfOff = {
    name: "Half Off",
    code: "50OFF",
    discount: "50",
    startDate: "9/29/2024",
    endDate: "10/31/2024",
  };

  const quarterOff = {
    name: "25 Off",
    code: "QUARTERCUT",
    discount: "25",
    startDate: "9/29/2024",
    endDate: "10/31/2024",
  };

  const promos = [halfOff, quarterOff];

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={() => document.getElementById("addMovieModal").showModal()}
        >
          Add Promotion
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
        {/* modal start */}
        <dialog id="addMovieModal" className="modal">
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
                    placeholder=""
                    name="name"
                  />
                </label>
                <label className="input input-bordered flex  input-primary items-center gap-2">
                  Code :
                  <input
                    type="text"
                    className="grow"
                    onChange={handleChange}
                    placeholder=""
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
                    placeholder=""
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered flex  input-primary items-center gap-2">
                  Start Date :
                  <input
                    type="date"
                    className="grow"
                    placeholder=""
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
                    placeholder=""
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
        </dialog>
        {/* modal end */}
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Active: </h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.name}>
                <PromoCard promo={promo} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Upcoming: </h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.name}>
                <PromoCard promo={promo} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Expired: </h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.name}>
                <PromoCard promo={promo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
