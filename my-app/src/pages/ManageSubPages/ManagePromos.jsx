import { useState, useEffect } from "react";
import { PromoCard } from "../../components/PromoCard";
import { EditPromoModal } from "../../components/EditPromoModal";
import { Loading } from "../../components/Loading";
import { createPromotion, getPromos, updatePromotion } from "../../utils/API";

export function ManagePromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [priceForm, setPriceForm] = useState({
    adult_price: 0.0,
    senior_price: 0.0,
    child_price: 0.0,
    booking_fee: 0.0,
    sales_tax: 0,
  });

  const openAddPromoModal = () => {
    setSelectedPromo(null);
    document.getElementById("promoModal").showModal();
  };

  const openEditPromoModal = (promo) => {
    setSelectedPromo(promo);
    document.getElementById("promoModal").showModal();
  };

  const handleSavePromo = async (promoData) => {
    if (selectedPromo) {
      try {
        const result = await updatePromotion(promoData, selectedPromo.code);
        console.log(result);
        setShouldUpdate(!shouldUpdate);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const result = await createPromotion(promoData);
        console.log(result);
        setShouldUpdate(!shouldUpdate);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Parse the value as a float, but handle empty strings gracefully
    const formattedValue = value === "" ? "" : parseFloat(value).toFixed(2);

    setPriceForm((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Ensure two decimals on blur
    if (value !== "") {
      setPriceForm((prevData) => ({
        ...prevData,
        [name]: parseFloat(value).toFixed(2),
      }));
    }
  };

  useEffect(() => {
    const setData = async () => {
      try {
        //get set prices
        const prices = await getPrices();
        setPriceForm(prices);
        //get set promos
        const promoList = await getPromos();
        setPromos(promoList);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    setData();
  }, [shouldUpdate]);

  if (loading) {
    return <Loading message="Loading Promos" />;
  }

  return (
    <div>
      <div className="w-full">
        <h1 className="text-xl font-medium">Manage Prices</h1>
        <div className="flex flex-wrap gap-2 flex-row">
          <form className="w-full">
            <form className="w-full flex flex-wrap gap-2">
              {[
                { label: "Adult Ticket", name: "adult_price" },
                { label: "Senior Ticket", name: "senior_price" },
                { label: "Child Ticket", name: "child_price" },
                { label: "Booking Fee", name: "booking_fee" },
                { label: "Sales Tax", name: "sales_tax" },
              ].map(({ label, name }) => (
                <label
                  key={name}
                  className="flex justify-between items-center gap-2 input input-sm input-bordered input-primary bg-white w-64 pr-2"
                >
                  {label}:
                  <input
                    type="number"
                    step="0.01"
                    className="w-24 text-middle"
                    name={name}
                    value={priceForm[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </label>
              ))}
            </form>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-xl font-medium">Manage Promotions</h1>
        <dialog id="promoModal" className="modal">
          <EditPromoModal
            onClose={() => document.getElementById("promoModal").close()}
            onSave={handleSavePromo}
            promo={selectedPromo}
          />
        </dialog>
      </div>
      <div className="flex flex-col gap-4">
        <div className="">
          <h1 className=""> Active: </h1>
          <div className="flex flex-wrap gap-4">
            {promos
              .filter((promo) => {
                return (
                  new Date(promo.startDate) <= Date.now() &&
                  Date.now() <= new Date(promo.endDate)
                );
              })
              .map((promo) => (
                <div className="min-w-60" key={promo.code}>
                  <PromoCard
                    promo={promo}
                    onEdit={() => openEditPromoModal(promo)}
                  />
                </div>
              ))}
            <div className="min-w-60">
              <button
                className="btn items-center w-full h-full text-lg font-thin"
                onClick={openAddPromoModal}
              >
                Add Promotion
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.75v14.5m7.25-7.25H4.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className=""> Upcoming: </h1>
          <div className="flex flex-wrap gap-4 ">
            {promos
              .filter((promo) => {
                return new Date(promo.startDate) > Date.now();
              })
              .map((promo) => (
                <div className="min-w-60" key={promo.code}>
                  <PromoCard
                    promo={promo}
                    onEdit={() => openEditPromoModal(promo)}
                  />
                </div>
              ))}
            <div className="min-w-60">
              <button
                className="btn items-center w-full h-full text-lg font-thin"
                onClick={openAddPromoModal}
              >
                Add Promotion
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.75v14.5m7.25-7.25H4.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className=""> Expired: </h1>
          <div className="flex flex-wrap gap-4">
            {promos
              .filter((promo) => {
                return new Date(promo.endDate) < Date.now();
              })
              .map((promo) => (
                <div className="min-w-60" key={promo.code}>
                  <PromoCard
                    promo={promo}
                    onEdit={() => openEditPromoModal(promo)}
                  />
                </div>
              ))}
            <div className="min-w-60">
              <button
                className="btn items-center w-full h-full text-lg font-thin"
                onClick={openAddPromoModal}
              >
                Add Promotion
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.75v14.5m7.25-7.25H4.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
