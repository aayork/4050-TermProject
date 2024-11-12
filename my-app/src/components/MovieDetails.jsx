export function MovieDetails({ movie }) {
  // Helper function to format runtime
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Helper function to format time
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Movie Header Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {/* Movie Poster */}
        <div className="flex-shrink-0">
          <img
            src={movie.photo}
            alt={movie.movieName}
            className="w-full md:w-[300px] rounded-lg shadow-lg"
          />
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
              <div className="text-2xl font-bold text-green-600">
                {movie.critics_score}%
              </div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Audience Score</span>
              <div className="text-2xl font-bold text-green-600">
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
              {movie.actors.map((actor) => (
                <span key={actor.id} className="text-gray-700 font-medium">
                  {actor.first_name} {actor.last_name}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{movie.description}</p>
        </div>
      </div>

      {/* Trailer Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Trailer</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={movie.trailer}
            title={`${movie.movieName} Trailer`}
            className="w-full h-[450px] rounded-lg"
            allowFullScreen
            frameBorder="0"
          ></iframe>
        </div>
      </div>

      {/* Showtimes Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Upcoming Showtimes</h2>
        <div className="grid gap-6">
          {movie.showtimes.map((showtime, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                {showtime.movieRoom.theatre.name}
              </h3>
              <p className="text-gray-600 mb-3">
                {showtime.movieRoom.theatre.street},{" "}
                {showtime.movieRoom.theatre.city},{" "}
                {showtime.movieRoom.theatre.state}{" "}
                {showtime.movieRoom.theatre.zipcode}
              </p>
              <div className="flex gap-4 mb-2">
                <span className="font-medium">{formatDate(showtime.date)}</span>
                <span className="font-medium">
                  {formatTime(showtime.startTime)} -{" "}
                  {formatTime(showtime.endTime)}
                </span>
              </div>
              <p className="text-gray-600">Room {showtime.movieRoom.number}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
