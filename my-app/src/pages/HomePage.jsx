import { Card } from "../components/Card";
import { useState } from "react";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const movies = [
    {
      title: "Star Wars: The Empire Strikes Back",
      description: "Who is Luke's father?",
      score: 96,
      rating: "PG",
      imageUrl: "https://i.ebayimg.com/images/g/iO0AAOSwO6phoMW5/s-l1200.jpg",
      link: "/details",
    },
    {
      title: "The Dark Knight",
      description: "Can Gotham be saved?",
      score: 94,
      rating: "PG13",
      imageUrl:
        "https://m.media-amazon.com/images/I/51rf820GM-L._AC_UF894,1000_QL80_.jpg",
      link: "/details",
    },
    {
      title: "Inception",
      description: "Your mind is the scene of the crime.",
      score: 86,
      rating: "PG13",
      imageUrl: "https://i.ebayimg.com/images/g/LlUAAOSwm8VUwoRL/s-l1200.jpg",
      link: "/details",
    },
    {
      title: "Interstellar",
      description: "The end of Earth will not be the end of us.",
      score: 72,
      rating: "PG13",
      imageUrl:
        "https://i.etsystatic.com/23402008/r/il/b658b2/2327469308/il_570xN.2327469308_492n.jpg",
      link: "/details",
    },
    {
      title: "Pulp Fiction",
      description:
        "Just because you are a character doesn't mean you have character.",
      score: 92,
      rating: "R",
      imageUrl:
        "https://m.media-amazon.com/images/I/81p2ZUI-+RL._AC_UF894,1000_QL80_.jpg",
      link: "/details",
    },
    {
      title: "Forrest Gump",
      description: "Life is like a box of chocolates.",
      score: 72,
      rating: "PG13",
      imageUrl:
        "https://m.media-amazon.com/images/I/41Al9falobL._AC_UF894,1000_QL80_.jpg",
      link: "/details",
    },
    {
      title: "The Matrix",
      description: "The Matrix is everywhere.",
      score: 87,
      rating: "R",
      imageUrl:
        "https://m.media-amazon.com/images/I/51oBxmV-dML._AC_UF894,1000_QL80_.jpg",
      link: "/details",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">Welcome to Movie Monkey!</h1>
      <p className="mb-4">
        Discover all of the latest blockbusters. Use the search bar to find your
        favorite films!
      </p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-auto-fit gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {movies
          .filter((movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((movie) => (
            <Card
              key={movie.title}
              title={movie.title}
              description={movie.description}
              score={movie.score}
              rating={movie.rating}
              imageUrl={movie.imageUrl}
              link={movie.link}
            />
          ))}
      </div>
    </div>
  );
}
