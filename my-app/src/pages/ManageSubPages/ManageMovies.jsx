import { ManageMovieCard } from "../../components/ManageMovieCard";
import { useState } from "react";

export function ManageMovies() {
  const initForm = {
    title: "",
    rating: "",
    runTime: "",
    year: "",
    studio: "",
    critScore: "",
    audiScore: "",
    thumbURL: "",
    posterURL: "",
    description: "",
  };

  const [formState, setFormState] = useState(initForm);

  //get currently showing movies

  const cancel = async (event) => {
    event.preventDefault();
    setFormState(initForm);
    document.getElementById("addMovieModal").close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formState);
    setFormState(initForm);
    document.getElementById("addMovieModal").close();
  };

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
            <form method="dialog" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2 py-2">
                <label className="input input-bordered flex  input-primary items-center gap-2">
                  Title :
                  <input
                    type="text"
                    className="grow"
                    placeholder="Ex: Star Wars"
                    onChange={handleChange}
                    name="title"
                  />
                </label>
                <label className="input input-bordered  input-primary flex items-center gap-2">
                  Rating :
                  <input
                    type="text"
                    className="grow"
                    onChange={handleChange}
                    name="rating"
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Run Time (mins) :
                  <input
                    type="number"
                    className="grow"
                    onChange={handleChange}
                    name="runTime"
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Year :
                  <input
                    type="number"
                    className="grow"
                    onChange={handleChange}
                    name="year"
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Studio :
                  <input
                    type="text"
                    className="grow"
                    onChange={handleChange}
                    name="studio"
                  />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <label className="input input-bordered input-primary flex items-center">
                      Critic Score :&nbsp;
                      <input
                        type="number"
                        className="grow w-1/3"
                        onChange={handleChange}
                        name="critScore"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="input input-bordered input-primary flex items-center">
                      Audience Score :&nbsp;
                      <input
                        type="number"
                        className="grow w-1/3"
                        onChange={handleChange}
                        name="audiScore"
                      />
                    </label>
                  </div>
                </div>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Thumbnail URL :
                  <input
                    type="url"
                    className="grow"
                    onChange={handleChange}
                    name="thumbURL"
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Poster URL :
                  <input
                    type="url"
                    className="grow"
                    onChange={handleChange}
                    name="posterURL"
                  />
                </label>
                <textarea
                  className="textarea textarea-primary"
                  placeholder="Description"
                  onChange={handleChange}
                  name="description"
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-primary btn-sm mx-2 text-monkey-white"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm text-monkey-white"
                  type="submit"
                  onSubmit={handleFormSubmit}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Currently Showing:</h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {movies.map((movie) => (
              <div className="grid-item" key={movie.id}>
                <ManageMovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Inactive:</h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
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
