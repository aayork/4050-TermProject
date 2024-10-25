import { ManageMovieCard } from "../../components/ManageMovieCard";
import { useState, useEffect } from "react";
import { getMovies, updateMovie, createMovie } from "../../utils/API";
import { Loading } from "../../components/Loading";
import { EditMovieModal } from "../../components/EditMovieModal";

export function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openAddMovieModal = () => {
    setSelectedMovie(null);
    document.getElementById("movieModal").showModal();
  };

  const openEditMovieModal = (movie) => {
    setSelectedMovie(movie);
    document.getElementById("movieModal").showModal();
  };

  const handleSaveMovie = async (movieData) => {
    if (selectedMovie) {
      console.log("Edit movie:", movieData);
      try {
        const result = await updateMovie(movieData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Add new movie:", movieData);
      try {
        const result = await createMovie(movieData);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //get movies
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMovies();
      setMovies(movies);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Loading message="Loading" />;
  }

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={openAddMovieModal}
        >
          Add Movie
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
        <dialog id="movieModal" className="modal">
          <EditMovieModal
            onClose={() => document.getElementById("movieModal").close()}
            onSave={handleSaveMovie}
            movie={selectedMovie}
          />
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Currently Showing:</h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {movies
              .filter((movie) => movie.is_active)
              .map((movie) => (
                <div className="grid-item" key={movie.id}>
                  <ManageMovieCard
                    movie={movie}
                    onEdit={() => openEditMovieModal(movie)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Inactive:</h1>
          <div className="grid grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {movies
              .filter((movie) => !movie.is_active)
              .map((movie) => (
                <div className="grid-item" key={movie.id}>
                  <ManageMovieCard
                    movie={movie}
                    onEdit={() => openEditMovieModal(movie)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
