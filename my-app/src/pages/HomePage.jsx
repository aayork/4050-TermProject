import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies } from "../utils/API";
import { Loading } from "../components/Loading";

export function HomePage() {
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
    <div className="relative z-10 p-4">
      {/* Ensure content is above the background */}
      {loading ? (
        <>
          <h1 className="text-3xl font-bold mb-2">Welcome to Movie Monkey!</h1>
          <p className="mb-4">
            Discover all of the latest blockbusters. Use the search bar to find
            your favorite films!
          </p>
          <div className="m-4">
            <h3 className="font-semibold text-xl">Now Showing</h3>
          </div>
          <Loading message="Loading..." />
          <div className="m-4">
            <h3 className="font-semibold text-xl">Coming Soon</h3>
          </div>
          <Loading message="Loading..." />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">Welcome to Movie Monkey!</h1>
          <p className="mb-4">
            Discover all of the latest blockbusters. Use the search bar to find
            your favorite films!
          </p>
          <div className="my-2">
            <h3 className="font-semibold text-2xl">Now Showing</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies
              .filter((movie) => movie.is_active)
              .map((movie) => (
                <MovieCard key={movie.movieName} movie={movie} />
              ))}
          </div>
          <div className="my-2">
            <h3 className="font-semibold text-2xl">Coming Soon...</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movies
              .filter((movie) => !movie.is_active)
              .map((movie) => (
                <MovieCard key={movie.movieName} movie={movie} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
