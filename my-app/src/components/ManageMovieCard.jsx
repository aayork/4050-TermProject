import PropTypes from "prop-types";

export function ManageMovieCard({ movie }) {
  //get movie information
  let title = "Star Wars: The Empire Strikes Back";
  let theater = "4";
  let movieId = "123";

  if (movie) {
    title = movie.title;
    theater = movie.theater;
    movieId = movie.id;
  }

  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
        <h2 className="">
          <b className="font-semibold">Title:</b> {title}
        </h2>
        <h3>
          <b className="font-semibold">Theater:</b> {theater}
        </h3>
        <h3></h3>
        <a
          href={`/admin/movieEdit/${movieId}`}
          className="btn btn-xs btn-primary w-full mt-2"
        >
          Edit Movie
        </a>
      </div>
    </div>
  );
}

// Add prop-types validation
ManageMovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string || null,
    theater: PropTypes.string || null,
    id: PropTypes.string || null,
  }),
};
