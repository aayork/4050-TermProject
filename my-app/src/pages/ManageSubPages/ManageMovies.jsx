import { ManageMovieCard } from "../../components/ManageMovieCard";
import { useState, useEffect } from "react";
import {
  getMovies,
  updateMovie,
  createMovie,
  deleteMovie,
} from "../../utils/API";
import { Loading } from "../../components/Loading";
import { EditMovieModal } from "../../components/EditMovieModal";
import { ViewTimesModal } from "../../components/ViewTimesModal";
import { Plus } from "lucide-react";

export function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  //get movies
  useEffect(() => {
    const fetchMovies = async () => {
      const moviesArr = await getMovies();
      setMovies(moviesArr);
      setLoading(false);
    };

    fetchMovies();
  }, [shouldUpdate]);

  const openAddMovieModal = () => {
    setSelectedMovie(null);
    document.getElementById("movieModal").showModal();
  };

  const openEditMovieModal = (movie) => {
    setSelectedMovie(movie);
    document.getElementById("movieModal").showModal();
  };

  const openViewTimesModal = (movie) => {
    setSelectedMovie(movie);
    document.getElementById("viewTimesModal").showModal();
  };

  const handleSaveMovie = async (movieData) => {
    setLoading(true);
    try {
      if (selectedMovie) {
        const result = await updateMovie(movieData);
        setShouldUpdate((prev) => !prev); // Trigger fetchMovies indirectly
        console.log("Updated", result);
      } else {
        const result = await createMovie(movieData);
        console.log(result);
        setShouldUpdate((prev) => !prev); // Trigger fetchMovies indirectly
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    setLoading(false);
  };

  const handleDeleteMovie = async () => {
    setLoading(true);
    try {
      const result = await deleteMovie(selectedMovie.id);
      setShouldUpdate(!shouldUpdate);
      alert(result.message);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading message="Loading" />;
  }

  return (
    <div>
      <div>
        <button
          className="btn btn-primary gap-2"
          onClick={openAddMovieModal}
        >
          <Plus className="h-4 w-4" />
          Add movie
        </button>
        <dialog id="movieModal" className="modal">
          <EditMovieModal
            onClose={() => document.getElementById("movieModal").close()}
            onSave={handleSaveMovie}
            onDelete={handleDeleteMovie}
            movie={selectedMovie}
          />
        </dialog>
        <dialog id="viewTimesModal" className="modal">
          <ViewTimesModal
            onClose={() => document.getElementById("viewTimesModal").close()}
            onUpdate={() => setShouldUpdate(!shouldUpdate)}
            movie={selectedMovie}
          />
        </dialog>
      </div>
      <div className="mt-8 flex flex-col gap-12">
        <div>
          <div className="mb-5 flex items-baseline justify-between border-b border-base-300 pb-3">
            <h2 className="text-2xl font-semibold">Currently showing</h2>
            <span className="font-sans text-sm text-monkey-ink/60">
              {movies.filter((movie) => movie.is_active).length} films
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies
              .filter((movie) => movie.is_active)
              .map((movie) => (
                <div className="grid-item" key={movie.id}>
                  <ManageMovieCard
                    movie={movie}
                    onEdit={() => openEditMovieModal(movie)}
                    viewTimes={() => openViewTimesModal(movie)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div>
          <div className="mb-5 flex items-baseline justify-between border-b border-base-300 pb-3">
            <h2 className="text-2xl font-semibold">Inactive</h2>
            <span className="font-sans text-sm text-monkey-ink/60">
              {movies.filter((movie) => !movie.is_active).length} films
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {movies
              .filter((movie) => !movie.is_active)
              .map((movie) => (
                <div className="grid-item" key={movie.id}>
                  <ManageMovieCard
                    movie={movie}
                    onEdit={() => openEditMovieModal(movie)}
                    viewTimes={() => null}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
