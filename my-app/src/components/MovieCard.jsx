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
    <div className="card bg-neutral text-neutral-content lg:card-side shadow-xl">
      <figure>
        <img
          src={movie.photo}
          className="rounded-t-2xl"
          style={{ width: "160px", height: "240px" }}
          alt={movie.movieName}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{movie.movieName}</h2>
        <p>{truncateDescription(movie.description, 100)}</p>
        <div className="badge badge-accent size-fit my-1">{movie.rating}</div>

        <div className="card-actions justify-end">
          <a
            href={`/details/${movie.id}`}
            className="btn btn-primary text-white absolute right-4 bottom-4"
          >
            Book Now
          </a>
          <button
            onClick={toggleModal}
            className="btn btn-primary text-white absolute left-4 bottom-4"
          >
            Trailer
          </button>
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
    critic_score: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
