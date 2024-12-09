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

  useEffect(() => {
    const fetchMovies = async () => {
      const moviesArr = await getMovies();
      setMovies(moviesArr);
      setMovieList(moviesArr);
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
          <SetGenres
            genres={genres}
            returnGenres={(genres) => setGenres(genres)}
          />
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
