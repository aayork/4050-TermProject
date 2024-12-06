import { useEffect, useState } from "react";
import { getAvailableRooms, getMovies, createShowtime } from "../../utils/API";
import { Loading } from "../../components/Loading";

export function ManageShowtimes() {
  const initForm = {
    movie_id: 0,
    date: "",
    time: "",
  };
  const [STform, setForm] = useState(initForm);
  const [movies, setMovies] = useState([]);
  const [avRooms, setAvRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);

  useEffect(() => {
    const getMovieArr = async () => {
      try {
        const movieArr = await getMovies();
        setMovies(movieArr);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieArr();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
    setAvRooms([]);
    setSearched(false);
    setSelectedRoom(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const avRoomsArr = await getAvailableRooms(
        STform.movie_id,
        STform.date,
        STform.time
      );
      console.log(avRoomsArr);
      setAvRooms(avRoomsArr);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createShowtimeForMovie = async () => {
    try {
      const response = await createShowtime(
        parseInt(STform.movie_id),
        STform.date,
        STform.time,
        selectedRoom
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading message="Loading" />;
  }

  return (
    <div className="flex  flex-col items-center p-4 gap-4">
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col w-full">
          <h1>Schedule a showtime </h1>
          {/* Select Movie */}
          <select
            className="select select-bordered select-primary"
            name="movie_id"
            value={STform.movie_id}
            onChange={handleChange}
          >
            <option disabled value="0">
              Pick Movie
            </option>
            {movies.map((movie) => (
              <option value={movie.id} key={movie.id}>
                {movie.movieName}
              </option>
            ))}
          </select>
          {STform.movie_id != 0 && (
            <label className="input input-bordered flex  input-primary items-center gap-2">
              Date :
              <input
                type="date"
                className="grow"
                value={STform.date}
                name="date"
                onChange={handleChange}
              />
            </label>
          )}
          {/* select time */}
          {STform.date && (
            <label className="input input-bordered flex  input-primary items-center gap-2">
              Time :
              <input
                type="time"
                className="grow"
                value={STform.time}
                name="time"
                onChange={handleChange}
              />
            </label>
          )}
          {STform.time && (
            <button
              onClick={handleSubmit}
              className="btn btn-primary text-white"
            >
              Find Room
            </button>
          )}
        </div>
      </form>
      {/* Showtime results  */}
      {searched ? (
        avRooms.length > 0 ? (
          <div className="self-start w-full">
            <h1 className="p-2">
              Available Rooms at {STform.time} on {STform.date}
            </h1>
            {/* insert map of showtime cards */}
            <div className="flex w-full gap-2 flex-wrap">
              {avRooms
                .filter((rooms) => rooms.is_active)
                .map((rooms) => (
                  <div
                    className="p-4 w-36 rounded-xl border border-monkey-green shadow-xl flex flex-col gap-2 justify-around items-center"
                    key={rooms.id}
                  >
                    <div className="card-content">Theater {rooms.id}</div>
                    <button
                      className="btn btn-primary text-white btn-xs"
                      onClick={() => setSelectedRoom(rooms.id)}
                    >
                      Select Room
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-lg font-semibold text-red-500">
              No rooms are available at {STform.time} on {STform.date}.
            </h1>
            <p className="text-gray-500">
              Please try a different time or date.
            </p>
          </div>
        )
      ) : null}

      {selectedRoom != 0 && (
        <div>
          <h1 className="py-2 mt-4">Selected Room : {selectedRoom}</h1>
          <button
            className="btn btn-primary text-white"
            onClick={() => createShowtimeForMovie()}
          >
            Create Showtime
          </button>
        </div>
      )}
    </div>
  );
}
