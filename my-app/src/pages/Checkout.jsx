import { useState } from "react";
import { OrderSummary } from "./CheckoutSubPages/OrderSummary.jsx";
import { Payment } from "./CheckoutSubPages/Payment.jsx";
import { Link, useLocation } from "react-router-dom";

export function Checkout() {
  const location = useLocation();
  const { tab: initialTab } = location.state || {}; // Get the initial tab state
  const [currentTab, setCurrentTab] = useState(initialTab || "summary"); // Default to 'summary' or the passed tab

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <div>
      <div className="w-full">
        <div role="tablist" className="tabs tabs-bordered w-full flex">
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab flex-1"
            aria-label="Order Summary"
            checked={currentTab === "summary"}
            onChange={() => handleTabChange("summary")}
          />
          <input
            type="radio"
            name="my_tabs"
            role="tab"
            className="tab flex-1"
            aria-label="Payment"
            checked={currentTab === "payment"}
            onChange={() => handleTabChange("payment")}
          />
        </div>
        {currentTab === "summary" && (
          <div className="py-2 px-4">
            <OrderSummary />
            <div className="flex flex-row justify-center">
              <Link to="/" className="btn mt-5 p-2 m-2">
                Back to Movie Selection
              </Link>
              <button
                onClick={() => handleTabChange("payment")}
                className="btn mt-5 p-2 m-2"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
        {currentTab === "payment" && (
          <div className="py-2 px-4">
            <Payment />
          </div>
        )}
      </div>
    </div>
  );
}
