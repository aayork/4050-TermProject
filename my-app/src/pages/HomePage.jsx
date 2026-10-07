import { MovieCard } from "../components/MovieCard";
import { useEffect, useState } from "react";
import { getMovies } from "../utils/API";

const gridClasses =
  "grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

function MovieSection({ title, movies, loading, emptyMessage }) {
  return (
    <section className="mt-10">
      <div className="mb-5 flex items-baseline justify-between border-b border-base-300 pb-3">
        <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        {!loading && (
          <span className="font-sans text-sm text-monkey-ink/60">
            {movies.length} {movies.length === 1 ? "film" : "films"}
          </span>
        )}
      </div>
      {loading ? (
        <div className={gridClasses}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="skeleton aspect-[2/3] w-full rounded-2xl" />
          ))}
        </div>
      ) : movies.length > 0 ? (
        <div className={gridClasses}>
          {movies.map((movie) => (
            <MovieCard key={movie.movieName} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-base-300 px-6 py-10 text-center text-monkey-ink/60">
          {emptyMessage}
        </p>
      )}
    </section>
  );
}

export function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesArr = await getMovies();
        setMovies(moviesArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden rounded-2xl bg-monkey-green px-6 py-7 text-monkey-white sm:px-10 sm:py-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-monkey-yellow/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/3 h-56 w-56 rounded-full bg-monkey-yellow/10 blur-3xl" />
        <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-monkey-yellow">
          Now playing at Movie Monkey
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          Find your next favorite film.
        </h1>
        <p className="mt-2 max-w-xl text-monkey-white/80">
          Discover the latest blockbusters, pick your seats, and book in a few
          clicks.
        </p>
        <a
          href="/search"
          className="btn btn-accent btn-sm mt-5 rounded-full border-none px-5"
        >
          Browse movies
        </a>
      </section>

      <MovieSection
        title="Now Showing"
        movies={movies.filter((movie) => movie.is_active)}
        loading={loading}
        emptyMessage="Nothing is showing right now. Check back soon!"
      />
      <MovieSection
        title="Coming Soon"
        movies={movies.filter((movie) => !movie.is_active)}
        loading={loading}
        emptyMessage="No upcoming releases announced yet."
      />
    </div>
  );
}
