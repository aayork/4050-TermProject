export function UserCard({ user, onEdit }) {
  return (
    <div className="p-2 flex flex-col justify-between shadow-xl border border-black rounded-xl h-full">
      <div className="">
        <h2 className="">
          <b className="font-semibold">Name:</b> {user.first_name}&nbsp;
          {user.last_name}
        </h2>
        <h3>
          <b className="font-semibold">Email:</b> {user.email}
        </h3>
        <h3>
          <b className="font-semibold">Username:</b> {user.username}
        </h3>
        <h3>
          <b className="font-semibold">Status:</b> {user.movie_profile.status}
        </h3>
      </div>
      <button
        onClick={onEdit}
        className="btn btn-xs btn-primary mt-2 text-white w-full"
      >
        Edit user
      </button>
    </div>
  );
}
