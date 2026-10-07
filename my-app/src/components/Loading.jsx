export function Loading({ message }) {
  return (
    <div role="status" className="flex items-center gap-3 p-4 font-sans text-sm text-monkey-ink/70">
      <span className="loading loading-spinner loading-sm text-primary"></span>
      <span>{message}</span>
    </div>
  );
}
