import { ManageMovieCard } from "../../components/ManageMovieCard";

export function ManageMovies() {
  //get currently showing movies

  //get inactive movies

  const inception = {
    title: "Inception",
    theater: "1",
    id: "456",
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Currently Showing:</h1>
          <div className="grid">
            <ManageMovieCard movie={null} />
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Inactive:</h1>
          <div className="grid">
            <ManageMovieCard movie={inception} />
          </div>
        </div>
      </div>
      <div className="hidden"></div>
    </div>
  );
}
