import { useState, useEffect } from "react";
import { PromoCard } from "../../components/PromoCard";
import { EditPromoModal } from "../../components/EditPromoModal";
import { Loading } from "../../components/Loading";
import { getPromos } from "../../utils/API";

export function ManagePromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPromo, setSelectedPromo] = useState(null);

  const openAddPromoModal = () => {
    setSelectedPromo(null);
    document.getElementById("promoModal").showModal();
  };

  const openEditPromoModal = (promo) => {
    setSelectedPromo(promo);
    document.getElementById("promoModal").showModal();
  };

  const handleSavePromo = (promoData) => {
    if (selectedPromo) {
      // Update the promo in the list (edit)
      console.log("Edit promo:", promoData);
    } else {
      // Add a new promo to the list
      console.log("Add new promo:", promoData);
    }
  };

  useEffect(() => {
    const fetchPromos = async () => {
      const promoList = await getPromos();
      console.log(promoList);
      setPromos(promoList);
      setLoading(false);
    };

    fetchPromos();
  }, []);

  if (loading) {
    return <Loading message="Loading Promos" />;
  }

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={openAddPromoModal}
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

        <dialog id="promoModal" className="modal">
          <EditPromoModal
            onClose={() => document.getElementById("promoModal").close()}
            onSave={handleSavePromo}
            promo={selectedPromo}
          />
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Active: </h1>
          <div className="grid grid gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.code}>
                <PromoCard
                  promo={promo}
                  onEdit={() => openEditPromoModal(promo)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Upcoming: </h1>
          <div className="grid grid  gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.code}>
                <PromoCard
                  promo={promo}
                  onEdit={() => openEditPromoModal(promo)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Expired: </h1>
          <div className="grid gap-4 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {promos.map((promo) => (
              <div className="grid-item min-w-fit" key={promo.code}>
                <PromoCard
                  promo={promo}
                  onEdit={() => openEditPromoModal(promo)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
