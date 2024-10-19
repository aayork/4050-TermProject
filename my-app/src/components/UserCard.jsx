import PropTypes from "prop-types";

export function UserCard({ user, onEdit }) {
  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
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
          <b className="font-semibold">Status:</b> {user.status}
        </h3>
        <a
          onClick={onEdit}
          className="btn btn-xs btn-primary w-full mt-2 text-white"
        >
          Edit user
        </a>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string || null,
    last_name: PropTypes.string || null,
    email: PropTypes.string || null,
    username: PropTypes.string || null,
    id: PropTypes.string || null,
    status: PropTypes.string || null,
  }),
};
