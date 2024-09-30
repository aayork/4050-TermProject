export function Card({ title, description, score, rating, imageUrl, link }) {
  return (
    <div className="card glass w-80 m-5 p-0 shadow-xl">
      <figure>
        <img src={imageUrl} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="inline-flex">
          <p>{description}</p>
          <div className="badge badge-accent">{rating}</div>
        </div>
        <p>🍅 {score}%</p>
        <div className="card-actions justify-end">
          <a href={link} className="btn btn-primary">
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
}
