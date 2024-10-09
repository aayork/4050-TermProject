import { useState } from "react";
import { OrderSummary } from "./CheckoutSubPages/OrderSummary.jsx";
import { Payment } from "./CheckoutSubPages/Payment.jsx";

export function Checkout() {
  const [selectedTab, setSelectedTab] = useState("summary");

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-full">
      <div role="tablist" className="tabs tabs-bordered w-full flex">
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab flex-1"
          aria-label="Order Summary"
          checked={selectedTab === "summary"}
          onChange={() => handleTabChange("summary")}
        />
        <input
          type="radio"
          name="my_tabs"
          role="tab"
          className="tab flex-1"
          aria-label="Payment"
          checked={selectedTab === "payment"}
          onChange={() => handleTabChange("payment")}
        />
      </div>
      {selectedTab === "summary" && (
        <div className="py-2 px-4">
          <OrderSummary />
        </div>
      )}
      {selectedTab === "payment" && (
        <div className="py-2 px-4">
          <Payment />
        </div>
      )}
    </div>
  );
}
