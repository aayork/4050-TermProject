import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies } from "../utils/API";
import { Loading } from "../components/Loading";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      console.log(movies);
      setMovies(movies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative h-full w-full bg-slate-950">
      {/* Background with linear gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 p-4 text-white">
        {" "}
        {/* Ensure content is above the background */}
        {loading ? (
          <>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Movie Monkey!
            </h1>
            <p className="mb-4">
              Discover all of the latest blockbusters. Use the search bar to
              find your favorite films!
            </p>
            <div className="mb-4 w-full">
              <input
                type="text"
                placeholder="Search for movies..."
                className="border p-2 rounded-md w-1/4 min-w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <h3 className="font-semibold text-xl">Currently Running</h3>
            </div>
            <Loading message="Loading Movies" />
            <div>
              <h3 className="font-semibold text-xl">Coming Soon</h3>
            </div>
            <Loading message="Loading Movies" />
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Movie Monkey!
            </h1>
            <p className="mb-4">
              Discover all of the latest blockbusters. Use the search bar to
              find your favorite films!
            </p>
            <div className="mb-4 w-full">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-auto-fit gap-4">
              {movies
                .filter(
                  (movie) =>
                    movie.movieName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) && movie.is_active,
                )
                .map((movie) => (
                  <MovieCard key={movie.movieName} movie={movie} />
                ))}
            </div>
            <div>
              <h3 className="font-semibold text-xl">Coming Soon...</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-auto-fit gap-4">
              {movies
                .filter(
                  (movie) =>
                    movie.movieName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) && !movie.is_active,
                )
                .map((movie) => (
                  <MovieCard key={movie.movieName} movie={movie} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
