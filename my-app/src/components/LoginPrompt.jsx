export function LoginPrompt() {
  return (
    <div className="modal-box align-center max-w-96">
      <div className="card-title text-2xl p-4 text-center">
        Please Register/Login to book a Ticket
      </div>
      <div className="card-content flex items-end justify-between gap-2">
        <button
          className="btn btn-sm text-white btn-warning"
          onClick={() => document.getElementById("promptLogin").close()}
        >
          Go Back
        </button>
        <div className="flex gap-2">
          <a className="btn btn-sm text-white btn-primary " href="/login">
            Login
          </a>
          <a className="btn btn-sm text-white btn-secondary " href="/register">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
