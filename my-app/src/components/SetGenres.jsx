import { useEffect, useState } from "react";
import { getGenres } from "../utils/API";

export function SetGenres({ genres, returnGenres }) {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreArr = await getGenres();
        setGenreList(genreArr);
      } catch (error) {
        console.log(error);
      }
    };

    fetchGenres();
  }, []);

  const applyGenres = () => {
    const checkedGenres = Array.from(
      document.querySelectorAll('#genreFilter input[type="checkbox"]:checked'),
      (checkbox) => checkbox.value
    );
    returnGenres(checkedGenres);
    document.getElementById("genreFilter").close();
  };

  const cancelGenres = () => {
    document
      .querySelectorAll('#genreFilter input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = genres.includes(checkbox.value);
      });
    document.getElementById("genreFilter").close();
  };

  return (
    <div className="modal-box">
      <h1 className="text-xl font-semibold">Select Genres</h1>
      <div className="flex flex-wrap gap-2 py-2">
        {genreList.map((genre) => (
          <div key={genre.id} className="w-32">
            <label className="cursor-pointer flex items-center gap-1">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                value={genre.name}
              />
              <span className="">{genre.name}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between mt-2">
        <button
          className="btn btn-sm btn-accent"
          onClick={() => cancelGenres()}
        >
          Cancel
        </button>
        <button
          className="btn btn-sm btn-primary text-white"
          onClick={() => applyGenres()}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
