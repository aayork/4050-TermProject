import { AddEditMovieModal } from "./EditMovieModal";

export function ManageMovieCard({ movie }) {
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
          onClick={() => document.getElementById("editMovieModal").showModal()}
          className="btn btn-xs btn-primary w-full mt-2"
        >
          Edit Movie
        </button>
      </div>
      <dialog id="editMovieModal" className="modal">
        <AddEditMovieModal movie={movie} />
      </dialog>
    </div>
  );
}
