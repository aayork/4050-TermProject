export function ManageMovieCard({ movie, onEdit, viewTimes }) {
  return (
    <div className="p-2 bg-white flex flex-col justify-between shadow-xl border border-primary rounded-xl h-full">
      <div className="">
        <h2 className="">
          <b className="font-semibold">Id:</b> {movie.id}
        </h2>
        <h2 className="">
          <b className="font-semibold">Title:</b> {movie.movieName}
        </h2>
      </div>
      <div>
        {movie.is_active && (
          <button
            onClick={viewTimes}
            className="btn btn-xs btn-secondary w-full mt-2 text-white"
          >
            View Showtimes
          </button>
        )}
        <button
          onClick={onEdit}
          className="btn btn-xs btn-primary w-full mt-2 text-white"
        >
          Edit Movie Details
        </button>
      </div>
    </div>
  );
}
