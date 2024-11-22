import { useState } from "react";

export function MovieCard({ movie }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <div className="card card-compact bg-neutral text-black p-0 shadow-2xl">
      <figure>
        <img src={movie.photo} className="w-full" alt={movie.movieName} />
      </figure>
      <div className="card-body space-y-1">
        <h2 className="font-bold">{movie.movieName}</h2>
        <div className="flex items-center justify-between gap-2">
          <div className="badge badge-accent size-fit my-0">{movie.rating}</div>
          <p>🍅 {movie.critics_score}%</p>
        </div>
        <p>{truncateDescription(movie.description, 50)}</p>
        <div className="card-actions flex justify-between">
          <button
            onClick={toggleModal}
            className="group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:translate-y-1 transition-transform justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-2 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-800 border-b-green-950 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-monkey-green text-sm sm:text-base dark:bg-green-800 dark:border-gray-700 dark:border-b-green-950"
          >
            <svg
              aria-hidden="true"
              className="h-3 w-3 flex-none fill-white group-active:fill-current"
            >
              <path d="m9.997 6.91-7.583 3.447A1 1 0 0 1 1 9.447V2.553a1 1 0 0 1 1.414-.91L9.997 5.09c.782.355.782 1.465 0 1.82Z"></path>
            </svg>
            <span className="ml-1">Trailer</span>
          </button>
          <a
            className="group flex h-min items-center disabled:opacity-50 disabled:hover:opacity-50 hover:translate-y-1 transition-transform justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-2 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-green-800 border-b-green-950 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-monkey-green text-sm sm:text-base dark:bg-green-800 dark:border-gray-700 dark:border-b-green-950"
            href={`/details/${movie.id}`}
          >
            Book Now!
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-between">
          <div className="relative bg-white rounded-lg shadow-lg p-2">
            <button
              onClick={toggleModal}
              className="btn btn-sm btn-circle absolute -right-4 -top-4"
            >
              ✕
            </button>
            <iframe
              className="rounded-lg"
              width="1120"
              height="630"
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
