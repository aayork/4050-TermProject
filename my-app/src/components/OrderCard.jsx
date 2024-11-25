export function OrderCard({ order }) {
  return (
    <div className="card border-monkey-green border my-2 p-4 shadow-lg flex flex-row items-center justify-between">
      <div className="">
        <div className="card-title font-semibold text-lg mb-2">
          <div> Insert Movie Name</div>
        </div>
        <div className="">
          <div className="">Order Number: {order.id}</div>
          <div> Purchase Date: {order.purchaseDate}</div>
          <div> Price: {order.id}</div>
          <div> Tickets: {order.id}</div>
        </div>
      </div>
    </div>
  );
}
