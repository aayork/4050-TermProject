export function Card() {
  return (
    <div className="card glass w-96 m-10 p-0">
      <figure>
        <img
          src="https://i.ebayimg.com/images/g/iO0AAOSwO6phoMW5/s-l1200.jpg"
          alt="car!"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Movie Title</h2>
        <p>What even is a movie?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Learn now!</button>
        </div>
      </div>
    </div>
  );
}
