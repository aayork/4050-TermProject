export function OrderCard({ order }) {
  return (
    <div className="card border-monkey-green border my-2 p-2 shadow-lg ">
      <div className="">
        <div className="card-title font-semibold text-xl mb-2">
          <div> {order.movie}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="w-56">
            <b className="font-semibold">Order Number: </b>
            {order.id}
          </div>
          <div className="w-56">
            <b className="font-semibold">Purchase Date: </b>
            {order.purchaseDate}
          </div>
          <div className="w-48">
            <b className="font-semibold">Order Total:</b> ${order.totalPrice}
          </div>

          <div className="w-36">
            <b className="font-semibold">Ticket Count:</b>{" "}
            {order.tickets.length}
          </div>
        </div>
      </div>
    </div>
  );
}
