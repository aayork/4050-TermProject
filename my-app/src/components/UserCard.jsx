export function UserCard({ user, onEdit, onSusAction }) {
  return (
    <div className="p-2 flex flex-col bg-white justify-between shadow-xl border border-primary rounded-xl h-full">
      <div className="">
        <h2 className="">
          <b className="font-semibold">Name:</b> {user.first_name}&nbsp;
          {user.last_name}
        </h2>
        <h3>
          <b className="font-semibold">Email:</b>
          <span className={user.emailStatus.verified ? "" : "text-red-600"}>
            {user.email}
          </span>
        </h3>
        <h3>
          <b className="font-semibold">Username:</b>
          {user.username}
        </h3>
        <h3>
          <b className="font-semibold">Status:</b>
          {user.movie_profile.status}
        </h3>
        {user.movie_profile.customer_state && (
          <h3>
            <b className="font-semibold">Account State:</b>
            {user.movie_profile.customer_state}
          </h3>
        )}
      </div>
      <div className="flex mt-2 gap-1">
        {user.movie_profile.customer_state !== "suspended" &&
        user.movie_profile.status !== "admin" ? (
          <div className="w-1/2">
            <button
              onClick={onSusAction}
              className="btn btn-xs btn-accent text-white w-full"
            >
              Suspend Account
            </button>
          </div>
        ) : user.movie_profile.customer_state === "suspended" ? (
          <div className="w-full">
            <button
              onClick={onSusAction}
              className="btn btn-xs btn-secondary text-white w-full"
            >
              Unsuspend Account
            </button>
          </div>
        ) : null}
        {user.movie_profile.customer_state !== "suspended" && (
          <div
            className={
              user.movie_profile.status !== "admin" ? "w-1/2" : "w-full"
            }
          >
            <button
              onClick={onEdit}
              className="btn btn-xs btn-primary text-white w-full"
            >
              Edit User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
