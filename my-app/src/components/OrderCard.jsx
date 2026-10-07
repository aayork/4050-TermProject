export function OrderCard({ order, refundTicket }) {
  const handleRefund = () => {
    refundTicket();
  };
  return (
    <div className="card border-monkey-green border my-2 p-2 shadow-lg ">
      <div className="">
        <div className="card-title font-semibold text-xl mb-2 flex justify-between">
          {order.is_refunded ? (
            <div className="text-red-500"> (Refunded Order) </div>
          ) : (
            <div className="text-xl"> {order.movie} </div>
          )}
          {!order.is_refunded &&
            new Date(order.showStartTime) >
              new Date(new Date().getTime() + 60 * 60 * 1000) && (
              <button className="btn btn-accent btn-sm">Refund</button>
            )}
        </div>
        <div className="grid grid-cols-2">
          <div className="w-56">
            <b className="font-semibold">Order Number: </b>
            {order.id}
          </div>
          <div className="w-64">
            <b className="font-semibold">Purchase Date: </b>
            {order.purchaseDate}
          </div>
          <div className="w-48">
            <b className="font-semibold">Order Total:</b> ${order.totalPrice}
          </div>

          <div className="w-40">
            <b className="font-semibold">Ticket Count:</b>{" "}
            {order.tickets.length}
          </div>
        </div>
      </div>
    </div>
  );
}
