export function ManageMovieCard({ movie, onEdit }) {
  //get movie information

  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
        <h2 className="">
          <b className="font-semibold">Id:</b> {movie.id}
        </h2>
        <h2 className="">
          <b className="font-semibold">Title:</b> {movie.movieName}
        </h2>
        <h3></h3>
        <button
          onClick={onEdit}
          className="btn btn-xs btn-primary w-full mt-2 text-white"
        >
          Edit Movie
        </button>
      </div>
    </div>
  );
}
