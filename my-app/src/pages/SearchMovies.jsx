import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies, getMoviesByShowday } from "../utils/API";
import { Loading } from "../components/Loading";

export function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesArr = await getMovies();
      setMovies(moviesArr);
      setMovieList(moviesArr);
      setGenreList(["Fantasy", "Sci-fi", "Horror"]);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const searchMovies = async () => {
    setLoading(true);
    let filteredMovies = movieList;
    if (searchTerm != "") {
      if (searchBy === "title") {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (searchBy === "showDay") {
        try {
          filteredMovies = await getMoviesByShowday(searchTerm);
          console.log("By showtime:", filteredMovies);
        } catch (error) {
          console.log(error);
        }
      }
    }

    // if (genres.length > 0) {
    //   filteredMovies = filteredMovies.filter((movie) =>
    //     genres.some((genre) => movie.genres.includes(genre))
    //   );
    // }

    setMovies(filteredMovies);
    setLoading(false);
  };

  const applyGenres = () => {
    const checkedGenres = Array.from(
      document.querySelectorAll('#genreFilter input[type="checkbox"]:checked'),
      (checkbox) => checkbox.value
    );
    setGenres(checkedGenres);

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
    <div className=" p-2">
      {/* Ensure content is above the background */}
      <div className="mb-4 w-full gap-4 flex ">
        <div className="h-full">
          <label className="text-lg">Search By </label>
          <select
            className="select select-bordered select-primary bg-white "
            onChange={(e) => setSearchBy(e.target.value)}
            value={searchBy}
          >
            <option value="title">Title</option>
            <option value="showDay">Show day</option>
          </select>
        </div>

        {searchBy === "title" ? (
          <input
            type="text"
            placeholder="Interstellar"
            className="min-w-80 input input-primary bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? searchMovies() : null)}
          />
        ) : (
          <input
            type="date"
            className="min-w-80 input input-primary bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <button
          className="text-lg text-white btn-accent btn"
          onClick={() => document.getElementById("genreFilter").showModal()}
        >
          Filter Genres
        </button>
        <dialog id="genreFilter" className="modal">
          <div className="modal-box">
            <h1 className="text-xl font-semibold">Select Genres</h1>
            <div className="flex flex-wrap gap-4 ">
              {genreList.map((genre) => (
                <div key={genre}>
                  <label className="label cursor-pointer">
                    <span className="">{genre}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary mx-2"
                      value={genre}
                    />
                  </label>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-between mt-2">
              <button
                className="btn btn-sm btn-warning"
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
        </dialog>

        <button
          className="btn btn-primary text-white text-lg"
          onClick={() => searchMovies()}
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loading message={"Loading movies"} />
      ) : (
        <>
          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.movieName} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="w-full text-center">
              No movies found. Please try different search criteria
            </div>
          )}
        </>
      )}
    </div>
  );
}
