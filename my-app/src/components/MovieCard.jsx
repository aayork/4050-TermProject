import { Play } from "lucide-react";

export function MovieCard({ movie }) {
  // Generate a unique modal ID based on the movie ID
  const modalId = `trailerModal-${movie.id}`;

  return (
    <div className="group relative aspect-[2/3] overflow-hidden rounded-2xl bg-monkey-ink shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <a href={`/details/${movie.id}`} className="absolute inset-0">
        <img
          src={movie.photo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          alt={movie.movieName}
          loading="lazy"
        />
        <span className="sr-only">View {movie.movieName}</span>
      </a>

      <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2 font-sans text-xs font-semibold text-monkey-white">
        <span className="rounded-md bg-monkey-ink/75 px-2 py-0.5 backdrop-blur">
          {movie.rating}
        </span>
        <span className="rounded-md bg-monkey-ink/75 px-2 py-0.5 backdrop-blur">
          🍅 {movie.critics_score}%
        </span>
      </div>

      {/* Actions slide up on hover/focus; always shown on touch devices */}
      <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-10 opacity-0 transition duration-300 ease-out group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        <button
          onClick={() => document.getElementById(modalId).showModal()}
          className="btn btn-sm flex-1 gap-1.5 border-none bg-white/20 text-monkey-white backdrop-blur hover:bg-white/30"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          Trailer
        </button>
        <a
          className="btn btn-accent btn-sm flex-1 border-none"
          href={`/details/${movie.id}`}
        >
          Book
        </a>
      </div>

      {/* Unique modal for each movie */}
      <dialog id={modalId} className="modal">
        <div className="modal-box relative aspect-video w-11/12 max-w-5xl overflow-visible bg-transparent p-0 shadow-none">
          <button
            onClick={() => {
              const iframe = document.querySelector(`#${modalId} iframe`);
              if (iframe) iframe.src = movie.trailer;

              document.getElementById(modalId).close();
            }}
            className="btn btn-circle btn-sm absolute -right-3 -top-3 z-[1000] border-none bg-white shadow"
          >
            ✕
          </button>
          <iframe
            className="h-full w-full rounded-2xl bg-black"
            src={movie.trailer}
            title="YouTube video player"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </dialog>
    </div>
  );
}
