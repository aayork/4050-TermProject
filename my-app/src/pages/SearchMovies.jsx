import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies, getMoviesByShowday } from "../utils/API";
import { Loading } from "../components/Loading";
import { SetGenres } from "../components/SetGenres";

export function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [movies, setMovies] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesArr = await getMovies();
      setMovies(moviesArr);
      setMovieList(moviesArr);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  const searchMovies = async (updatedGenres = genres) => {
    setLoading(true);

    let filteredMovies = movieList;

    if (searchTerm.trim() !== "") {
      if (searchBy === "title") {
        filteredMovies = filteredMovies.filter((movie) =>
          movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (searchBy === "showDay") {
        try {
          filteredMovies = await getMoviesByShowday(searchTerm);
        } catch (error) {
          console.error(error);
        }
      }
    }

    if (updatedGenres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genres.some((movieGenre) =>
          updatedGenres.includes(movieGenre.name)
        )
      );
    }

    setMovies(filteredMovies);
    setLoading(false);
  };

  const filterMoviesByGenre = (genresActive) => {
    setGenres(genresActive);
    searchMovies(genresActive);
  };

  const clearFilters = () => {
    setGenres([]);
    setShowMenu(false);
    searchMovies([]);
    // Select all checked checkboxes and uncheck them
    document
      .querySelectorAll('#genreFilter input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold sm:text-4xl">Find a movie</h1>
      <p className="mt-2 mb-6 text-monkey-ink/70">
        Search by title or pick a day to see what&apos;s showing.
      </p>
      <div className="mb-8 flex w-full flex-wrap items-center gap-3 rounded-2xl border border-base-300 bg-white p-3 shadow-sm">
        <div>
          <label className="sr-only">Search By</label>
          <select
            className="select select-bordered bg-white"
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
            className="input input-bordered min-w-0 flex-1 bg-white sm:min-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? searchMovies() : null)}
          />
        ) : (
          <input
            type="date"
            className="input input-bordered min-w-0 flex-1 bg-white sm:min-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <button
          className="btn btn-primary px-6"
          onClick={() => searchMovies()}
        >
          Search
        </button>

        <button
          className="btn btn-accent"
          onClick={() => document.getElementById("genreFilter").showModal()}
        >
          Filter Genres
        </button>

        {genres.length > 0 && (
          <div className="relative inline-block">
            {/* Main Button */}
            <button
              className="btn btn-circle btn-outline btn-primary"
              onClick={() => setShowMenu(!showMenu)}
            >
              {genres.length}
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute left-0 z-10 mt-2 w-36 overflow-hidden rounded-xl border border-base-300 bg-white shadow-lg">
                <button
                  className="block w-full px-3 py-2 text-left text-sm hover:bg-base-200"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
        <dialog id="genreFilter" className="modal">
          <SetGenres
            genres={genres}
            returnGenres={(genres) => filterMoviesByGenre(genres)}
          />
        </dialog>
      </div>

      {loading ? (
        <Loading message={"Loading movies"} />
      ) : (
        <>
          {movies.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {movies.map((movie) => (
                <MovieCard key={movie.movieName} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="w-full rounded-2xl border border-dashed border-base-300 px-6 py-10 text-center text-monkey-ink/60">
              No movies found. Please try different search criteria
            </div>
          )}
        </>
      )}
    </div>
  );
}
