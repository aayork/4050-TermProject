import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies } from "../utils/API";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      console.log(movies);
      setMovies(movies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to Movie Monkey!</h1>
      <p className="mb-4">
        Discover all of the latest blockbusters. Use the search bar to find your
        favorite films!
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h3 className="font-semibold text-xl">Currently Running</h3>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto-fit gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {movies
          .filter(
            (movie) =>
              movie.movieName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) && movie.is_active
          )
          .map((movie) => (
            <MovieCard
              key={movie.movieName}
              title={movie.title}
              description={movie.description}
              score={movie.critics_score}
              rating={movie.rating}
              imageUrl={movie.photo}
              trailer={movie.trailer}
            />
          ))}
      </div>
      <div>
        <h3 className="font-semibold text-xl">Coming Soon</h3>
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto-fit gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {movies
          .filter(
            (movie) =>
              movie.movieName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) && !movie.is_active
          )
          .map((movie) => (
            <MovieCard
              key={movie.movieName}
              title={movie.title}
              description={movie.description}
              score={movie.critics_score}
              rating={movie.rating}
              imageUrl={movie.photo}
              trailer={movie.trailer}
            />
          ))}
      </div>
    </div>
  );
}
