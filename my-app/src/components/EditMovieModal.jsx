export function AddEditMovieModal({ movie }) {
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

  return (
    <div className="modal-box">
      <h1 className="font-semibold text-lg"> Edit Movie</h1>
      <div className="border border-monkey-green"></div>
      <form method="dialog" onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-2 py-2">
          <label className="input input-bordered flex  input-primary items-center gap-2">
            Title :
            <input
              type="text"
              className="grow"
              placeholder="Ex: Star Wars"
              defaultValue={movie.movieName}
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
          {/* <button
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
          </button> */}
        </div>
      </form>
    </div>
  );
}
