import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies } from "../utils/API";
import { Loading } from "../components/Loading";

export function SearchMovies() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMovies(movies);
      setLoading(false);
    };

    fetchMovies();
  });

  return (
    <div className="">
      {/* Ensure content is above the background */}
      <>
        <div className="mb-4 w-full">
          <select>
            <option value="title">Title</option>
            <option value="genre">Genre</option>
            <option value="showtime">Show day and time</option>
          </select>
          <input
            type="text"
            placeholder="Search for movies..."
            className="border p-2 rounded-md w-1/4 min-w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <h3 className="font-semibold text-xl">Now Showing</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies
            .filter(
              (movie) =>
                movie.movieName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) && movie.is_active
            )
            .map((movie) => (
              <MovieCard key={movie.movieName} movie={movie} />
            ))}
        </div>
      </>
    </div>
  );
}
