export function MovieInfo({ movie }) {
  // Helper function to format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  function getScoreColor(score) {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-error";
  }

  return (
    <div className="w-full mx-auto">
      {/* Movie Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-6 lg:gap-10 mb-10">
        {/* Trailer Section */}
        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">
          <iframe
            src={movie.trailer}
            title={`${movie.movieName} Trailer`}
            className="w-full h-full"
            allowFullScreen
          ></iframe>
        </div>

        {/* Movie Info */}
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {movie.movieName}
            </h1>
            {/* Movie Meta Info */}
            <p className="mt-1.5 font-sans text-sm text-monkey-ink/60">
              {movie.year} · {movie.rating} · {formatRuntime(movie.runtime)} ·{" "}
              {movie.studio}
            </p>
          </div>

          {/* Scores and genres */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-sans text-sm">
            <span>
              🍅 <b className={`font-semibold`}>{movie.critics_score}%</b>{" "}
              <span className="text-monkey-ink/60">Critics</span>
            </span>
            <span>
              🍿 <b className={`font-semibold`}>{movie.audience_score}%</b>{" "}
              <span className="text-monkey-ink/60">Audience</span>
            </span>
            <span className="flex flex-wrap gap-1.5">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-monkey-beige px-2.5 py-0.5 text-xs font-medium text-monkey-green"
                >
                  {genre.name}
                </span>
              ))}
            </span>
          </div>

          {/* Description */}
          <p className="leading-relaxed text-monkey-ink/80">
            {movie.description}
          </p>

          {/* Cast */}
          {movie.actors.length > 0 && (
            <p className="text-sm text-monkey-ink/80 flex flex-col">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-monkey-ink/60">
                Cast
              </span>{" "}
              <p>
                {movie.actors
                  .map((actor) =>
                    `${actor.first_name} ${actor.last_name}`.trim(),
                  )
                  .join(", ")}
              </p>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
