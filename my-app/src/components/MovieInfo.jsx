export function MovieInfo({ movie }) {
  // Helper function to format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  function getScoreColor(score) {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }

  return (
    <div className="w-full mx-auto">
      {/* Movie Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Trailer Section */}
        <div className="mb-12 shadow-lg aspect-video">
          <iframe
            src={movie.trailer}
            title={`${movie.movieName} Trailer`}
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>

        {/* Movie Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            {movie.movieName} ({movie.year})
          </h1>

          {/* Movie Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
              {movie.rating}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
              {formatRuntime(movie.runtime)}
            </span>
            <span className="px-3 py-1 bg-gray-100 rounded-md text-sm">
              {movie.studio}
            </span>
          </div>

          {/* Scores */}
          <div className="flex gap-8 mb-6">
            <div>
              <span className="text-gray-600 text-sm">Critics Score</span>
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  movie.critics_score
                )}`}
              >
                {movie.critics_score}%
              </div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Audience Score</span>
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  movie.audience_score
                )}`}
              >
                {movie.audience_score}%
              </div>
            </div>
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Cast */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Cast:</h3>
            <div className="flex flex-wrap gap-4">
              {movie.actors.map((actor, index) => (
                <span key={actor.id} className="text-gray-700 font-medium">
                  {actor.first_name} {actor.last_name}
                  {index < movie.actors.length - 1 && ","}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
