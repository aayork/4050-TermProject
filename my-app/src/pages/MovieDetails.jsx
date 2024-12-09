import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieHall } from "../components/MovieHall";
import { getMovieDetails } from "../utils/API";
import { Loading } from "../components/Loading";

export function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await getMovieDetails(id);
        if (movie) {
          setMovie(movie);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loading message={`Loading Movie`} />;
  }

  return <div>{movie && <MovieHall movie={movie} />}</div>;
}
