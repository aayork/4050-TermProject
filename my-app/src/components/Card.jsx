export function Card() {
  return (
    <div className="card glass w-96 m-10 p-0 shadow-xl">
      <figure>
        <img
          src="https://i.ebayimg.com/images/g/iO0AAOSwO6phoMW5/s-l1200.jpg"
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Star Wars: The Empire Strikes Back</h2>
        <div className="inline-flex">
          <p>Who is Luke&apos;s father?</p>
          <div className="badge badge-accent">R</div>
        </div>
        <p>🍅 96%</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Get Tickets</button>
        </div>
      </div>
    </div>
  );
}
