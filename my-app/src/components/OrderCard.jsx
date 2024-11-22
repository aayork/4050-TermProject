export function PaymentCard({ order }) {
  return (
    <div className="card border-monkey-green border my-2 p-4 shadow-lg flex flex-row items-center justify-between">
      <div className="">
        <div className="card-title font-semibold text-lg mb-2"></div>
        <div className="">
          <div className="">{order.id}</div>
          <div> Price: {order.totalPrice}</div>
          <div> Tickets: {order.tickets.length}</div>
        </div>
      </div>
    </div>
  );
}
