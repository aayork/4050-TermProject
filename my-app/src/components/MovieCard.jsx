//import PropTypes from "prop-types";
import { useState } from "react";

export function MovieCard({ movie }) {
  const [trailerOn, setIsChecked] = useState(true);

  // Method to turn off the checkbox
  const toggleTrailer = () => {
    setIsChecked(!trailerOn);
  };

  return (
    <div className="card glass w-80 m-5 p-0 shadow-xl">
      <div className="w-full flex-col">
        <div className="flex-1">
          <label className="swap swap-flip text-9xl w-full h-full">
            <input
              type="checkbox"
              checked={trailerOn}
              onChange={toggleTrailer}
              name="trailerPoster"
            />
            <div className="swap-on">
              <img
                src={movie.photo}
                className="rounded-t-2xl"
                style={{ width: "320px", height: "480px" }}
                alt={movie.movieName}
              />
            </div>
            <div className="swap-off flex flex-col">
              <iframe
                className="rounded-t-2xl"
                width="320"
                height="480"
                src={movie.trailer}
                title="YouTube video player"
                allowFullScreen
              ></iframe>
            </div>
          </label>
        </div>
        <div className="w-full flex justify-center align-center h-6">
          <button
            onClick={toggleTrailer}
            className="text-sm btn btn-xs text-white btn-primary"
          >
            {trailerOn ? "Watch Trailer" : "View Poster"}
          </button>
        </div>
      </div>
      <div className="card-body mt-2 pt-0 pb-2 px-6">
        <h2 className="card-title">{movie.movieName}</h2>
        <div className="inline-flex">
          <p>{movie.description}</p>
          <div className="badge badge-accent">{movie.rating}</div>
        </div>
        <p>🍅 {movie.critic_score}%</p>
        <div className="card-actions justify-end">
          <a
            href={`/details/${movie.id}`}
            className="btn btn-primary text-white"
          >
            Details
          </a>
        </div>
      </div>
    </div>
  );
}

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     movieName: PropTypes.string || null,
//     description: PropTypes.string || null,
//     score: PropTypes.number || null,
//     rating: PropTypes.string || null,
//     photo: PropTypes.string || null,
//     trailer: PropTypes.string || null,
//   }),
// };
