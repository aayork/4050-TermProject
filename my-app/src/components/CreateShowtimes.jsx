import { useState } from "react";
import { getAvailableRooms, createShowtime } from "../utils/API";

export function CreateShowtimes({ movie, onUpdate }) {
  const initForm = {
    date: "",
    time: "",
  };
  const [STform, setForm] = useState(initForm);
  const [avRooms, setAvRooms] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(0);

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
        movie.id,
        STform.date,
        STform.time
      );
      setAvRooms(avRoomsArr);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  const createShowtimeForMovie = async () => {
    try {
      const response = await createShowtime(
        parseInt(movie.id),
        STform.date,
        STform.time,
        selectedRoom
      );
      setAvRooms([]);
      setSearched(false);
      setSelectedRoom(0);
      setForm(initForm);
      onUpdate();
      alert(
        `Created showtime for ${movie.movieName}\nAt ${response.startTime}\nIn theater ${response.movieRoom}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="flex gap-2 flex-col w-full items-center">
          <label className="input input-bordered flex input-sm input-primary items-center gap-2 w-56">
            Date :
            <input
              type="date"
              className="grow"
              value={STform.date}
              name="date"
              onChange={handleChange}
            />
          </label>
          {/* select time */}
          {STform.date && (
            <label className="input input-bordered flex input-sm input-primary items-center gap-2 w-56">
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
              className="btn btn-primary btn-sm text-white"
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
                    className="p-2 w-32 rounded-xl border border-monkey-green shadow-lg flex flex-col gap-2 justify-around items-center"
                    key={rooms.id}
                  >
                    <div className="card-content text-sm">
                      Theater {rooms.id}
                    </div>
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
          <h1 className="py-2 mt-2">Selected Room : {selectedRoom}</h1>
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
