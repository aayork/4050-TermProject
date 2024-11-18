import { useState, useEffect, useMemo } from "react";

export function EditMovieModal({ onClose, onSave, movie, onDelete }) {
  const initForm = useMemo(
    () => ({
      id: "",
      movieName: "",
      rating: "",
      runtime: "",
      year: "",
      studio: "",
      critics_score: "",
      audience_score: "",
      trailer: "",
      photo: "",
      description: "",
      is_active: false,
    }),
    []
  );
  const [movieDetails, setMovieDetails] = useState(initForm);

  useEffect(() => {
    if (movie) {
      setMovieDetails(movie);
    } else {
      setMovieDetails(initForm);
    }
  }, [movie, initForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(movieDetails);
    onClose();
  };

  const close = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete " + movie.movieName)) {
      onDelete();
      onClose();
    }
  };

  return (
    <div className="modal-box max-w-2xl">
      <h1 className="font-semibold text-lg">
        {movie ? "Update Movie" : "Add Movie"}
      </h1>
      <div className="border border-monkey-green"></div>
      <form method="dialog" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-2">
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Title:
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              name="movieName"
              value={movieDetails.movieName}
            />
          </label>
          <label className="input input-bordered  input-primary flex items-center gap-2">
            Rating:
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              name="rating"
              value={movieDetails.rating}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Run Time (mins):
            <input
              type="number"
              className="grow"
              onChange={handleChange}
              name="runtime"
              value={movieDetails.runtime}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Year:
            <input
              type="number"
              className="grow"
              onChange={handleChange}
              name="year"
              value={movieDetails.year}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Studio:
            <input
              type="text"
              className="grow"
              onChange={handleChange}
              name="studio"
              value={movieDetails.studio}
            />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <label className="input input-bordered input-primary flex items-center">
                Critic Score:
                <input
                  type="number"
                  className="grow w-1/3"
                  onChange={handleChange}
                  name="critics_score"
                  value={movieDetails.critics_score}
                />
              </label>
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center">
                Audience Score:
                <input
                  type="number"
                  className="grow w-1/3"
                  onChange={handleChange}
                  name="audience_score"
                  value={movieDetails.audience_score}
                />
              </label>
            </div>
          </div>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Trailer Embed URL:
            <input
              type="url"
              className="grow"
              onChange={handleChange}
              name="trailer"
              value={movieDetails.trailer}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Poster URL:
            <input
              type="url"
              className="grow"
              onChange={handleChange}
              name="photo"
              value={movieDetails.photo}
            />
          </label>
          <textarea
            className="textarea textarea-primary"
            placeholder="Description"
            onChange={handleChange}
            name="description"
            value={movieDetails.description}
          ></textarea>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="w-1/3">
            <label className="label cursor-pointer">
              <span className="mx-2">Is Active</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                name="is_active"
                checked={movieDetails.is_active}
                onChange={(e) =>
                  setMovieDetails((prevData) => ({
                    ...prevData,
                    is_active: e.target.checked,
                  }))
                }
              />
            </label>
          </div>
          <div className="modal-action mt-0">
            <button
              className="btn btn-secondary btn-sm text-monkey-white text-white"
              onClick={close}
            >
              Cancel
            </button>
            {movie && (
              <button
                className="btn btn-warning btn-sm text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
            <button
              className="btn btn-primary btn-sm text-white"
              onClick={handleSubmit}
            >
              {movie ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
