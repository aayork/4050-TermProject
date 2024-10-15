import PropTypes from "prop-types";
import { useState } from "react";

export function MovieCard({ movie }) {
  const [isModalOpen, setModalOpen] = useState(false);

  // Method to toggle the modal
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Function to truncate the movie description
  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="card card-compact bg-neutral text-gray-50 w-80 p-0 shadow-xl">
      <figure>
        <img src={movie.photo} className="w-full" alt={movie.movieName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.movieName}</h2>
        <div className="flex justify-between items-center">
          <div className="badge badge-accent size-fit my-1">{movie.rating}</div>
          <p className="mx-1">🍅 {movie.critics_score}%</p>
        </div>
        <p>{truncateDescription(movie.description, 100)}</p>
        <div className="card-actions justify-between">
          <button onClick={toggleModal} className="btn btn-primary">
            Trailer
          </button>
          <a href={`/details/${movie.id}`} className="btn btn-primary">
            Book Now!
          </a>
        </div>
      </div>

      {/* Modal Implementation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-lg p-2">
            <button
              onClick={toggleModal}
              className="btn btn-sm btn-circle absolute -right-4 -top-4"
            >
              ✕
            </button>
            <iframe
              className="rounded-lg"
              width="560"
              height="315"
              src={movie.trailer}
              title="YouTube video player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    movieName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
    critics_score: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
