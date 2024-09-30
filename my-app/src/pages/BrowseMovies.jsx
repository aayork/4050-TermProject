import { Card } from "../components/Card";

export function BrowseMovies() {
  return (
    <div className="flex flex-wrap justify-center gap-1 p-4">
      <Card
        title="Star Wars: The Empire Strikes Back"
        description="Who is Luke's father?"
        rating={96}
        imageUrl="https://i.ebayimg.com/images/g/iO0AAOSwO6phoMW5/s-l1200.jpg"
        link="/details"
      />

      <Card
        title="The Dark Knight"
        description="Can Gotham be saved?"
        rating={94}
        imageUrl="https://cdn.europosters.eu/image/750/wall-murals/the-dark-knight-trilogy-joker-i184453.jpg"
        link="/details"
      />
    </div>
  );
}
