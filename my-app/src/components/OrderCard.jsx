export function OrderCard({ order }) {
  return (
    <div className="card border-monkey-green border my-2 px-2 py-4 shadow-lg ">
      <div className="">
        <div className="card-title font-semibold text-lg mb-2">
          <div> Insert Movie Name</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <b className="font-semibold">Order Number:</b> {order.id}
          </div>

          <div>
            <b className="font-semibold">Purchase Date: </b>
            {order.purchaseDate}
          </div>
          <div>
            <b className="font-semibold">Price Paid:</b> ${order.id}
          </div>

          <div>
            {" "}
            <b className="font-semibold">Ticket Count:</b> {order.id}
          </div>
        </div>
      </div>
    </div>
  );
}
