import { ManageMovieCard } from "../../components/ManageMovieCard";

export function ManageMovies() {
  //get currently showing movies

  //get inactive movies

  const inception = {
    title: "Inception",
    theater: "1",
    id: "456",
  };

  const interstellar = {
    title: "Interstellar",
    theater: "3",
    id: "46346",
  };

  const movies = [inception, interstellar];

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={() => document.getElementById("addMovieModal").showModal()}
        >
          Add Movie
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
        <dialog id="addMovieModal" className="modal">
          <div className="modal-box">
            <h3 className="font-semibold text-lg">Add Movie Details</h3>
            <div className="border border-monkey-green"></div>
            <div className="flex flex-col gap-2 py-2">
              <label className="input input-bordered flex  input-primary items-center gap-2">
                Title :
                <input
                  type="text"
                  className="grow"
                  placeholder="Ex: Star Wars"
                />
              </label>
              <label className="input input-bordered  input-primary flex items-center gap-2">
                Rating :
                <input type="text" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Run Time (mins) :
                <input type="number" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Year :
                <input type="number" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Studio :
                <input type="text" className="grow" placeholder="" />
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="">
                  <label className="input input-bordered input-primary flex items-center">
                    Critic Score :&nbsp;
                    <input
                      type="number"
                      className="grow w-1/3"
                      placeholder=""
                    />
                  </label>
                </div>
                <div>
                  <label className="input input-bordered input-primary flex items-center">
                    Audience Score :&nbsp;
                    <input
                      type="number"
                      className="grow w-1/3"
                      placeholder=""
                    />
                  </label>
                </div>
              </div>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Thumbnail URL :
                <input type="url" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Poster URL :
                <input type="url" className="grow" placeholder="" />
              </label>
              <textarea
                className="textarea textarea-primary"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary btn-sm mx-2 text-monkey-white">
                  Close
                </button>
                <button className="btn btn-primary btn-sm text-monkey-white">
                  Create
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Currently Showing:</h1>
          <div className="grid grid-cols-4">
            {movies.map((movie) => (
              <div className="grid-item" key={movie.id}>
                <ManageMovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Inactive:</h1>
          <div className="grid grid-cols-4">
            {movies.map((movie) => (
              <div className="grid-item" key={movie.id}>
                <ManageMovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
