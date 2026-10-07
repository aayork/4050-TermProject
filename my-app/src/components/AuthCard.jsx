import banana from "../assets/banana.png";

// Shared centered card layout for login, register, and password reset pages
export function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex justify-center py-6 sm:py-12">
      <div className="w-full max-w-md rounded-3xl border border-base-300 bg-white p-8 shadow-sm sm:p-10">
        <img src={banana} alt="" className="mb-6 h-10 w-auto" />
        <h1 className="text-3xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-2 text-monkey-ink/70">{subtitle}</p>}
        <div className="mt-8">{children}</div>
        {footer && (
          <div className="mt-6 border-t border-base-300 pt-6 font-sans text-sm text-monkey-ink/70">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export function AuthField({ label, ...inputProps }) {
  return (
    <label className="form-control w-full">
      <span className="mb-1.5 text-sm font-medium text-monkey-ink/80">
        {label}
      </span>
      <input className="input input-bordered w-full bg-white" {...inputProps} />
    </label>
  );
}
