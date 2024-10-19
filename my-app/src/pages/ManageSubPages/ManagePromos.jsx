import { useState } from "react";
import { PromoCard } from "../../components/PromoCard";

export function ManagePromos() {
  const initForm = {
    name: "",
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
  };
  const [formState, setFormState] = useState(initForm);

  const cancel = async (event) => {
    event.preventDefault();
    setFormState(initForm);
    document.getElementById("addPromoModal").close();
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
    setFormState(initForm);
    document.getElementById("addPromoModal").close();
  };

  const halfOff = {
    name: "Half Off",
    code: "50OFF",
    discount: "50",
    startDate: "9/29/2024",
    endDate: "10/31/2024",
  };

  const quarterOff = {
    name: "Fall Discount",
    code: "FALL24",
    discount: "24",
    startDate: "9/29/2024",
    endDate: "10/31/2024",
  };

  const promos = [halfOff, quarterOff];

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={() => document.getElementById("addPromoModal").showModal()}
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
        <dialog id="addPromoModal" className="modal">
          
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
