import { Card } from "../components/Card";

export function BrowseMovies() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(375px,1fr))] gap-2">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
}
