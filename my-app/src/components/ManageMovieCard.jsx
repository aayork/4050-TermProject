import { CalendarClock, Pencil } from "lucide-react";

const iconButton =
  "btn btn-circle btn-sm border-none bg-black/50 text-monkey-white backdrop-blur hover:bg-monkey-yellow hover:text-monkey-ink";

export function ManageMovieCard({ movie, onEdit, viewTimes }) {
  return (
    <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-monkey-ink shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={movie.photo}
        alt={movie.movieName}
        loading="lazy"
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
        <span className="rounded-md bg-monkey-ink/75 px-2 py-0.5 font-sans text-xs font-semibold text-monkey-white backdrop-blur">
          #{movie.id}
        </span>
        <div className="flex gap-1.5">
          {movie.is_active && (
            <div className="tooltip tooltip-left" data-tip="View showtimes">
              <button
                onClick={viewTimes}
                className={iconButton}
                aria-label="View showtimes"
              >
                <CalendarClock className="h-4 w-4" />
              </button>
            </div>
          )}
          <div className="tooltip tooltip-left" data-tip="Edit details">
            <button
              onClick={onEdit}
              className={iconButton}
              aria-label="Edit details"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-4 pb-4 pt-12">
        <h2 className="line-clamp-2 font-semibold leading-snug text-monkey-white">
          {movie.movieName}
        </h2>
      </div>
    </div>
  );
}
