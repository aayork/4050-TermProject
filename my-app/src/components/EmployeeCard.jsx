import PropTypes from "prop-types";

export function EmployeeCard({ employee }) {
  const first_name = employee.first_name;
  const last_name = employee.last_name;
  const email = employee.email;
  const username = employee.username;
  const id = employee.id;

  return (
    <div className="m-5 p-0 shadow-xl border border-black rounded-xl">
      <div className=" p-2">
        <h2 className="">
          <b className="font-semibold">Name:</b> {first_name}&nbsp;
          {last_name}
        </h2>
        <h3>
          <b className="font-semibold">Email:</b> {email}
        </h3>
        <h3>
          <b className="font-semibold">Username:</b> {username}
        </h3>
        <h3></h3>
        <a
          href={`/admin/employeeEdit/${id}`}
          className="btn btn-xs btn-primary w-full mt-2"
        >
          Edit Employee
        </a>
      </div>
    </div>
  );
}

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
    first_name: PropTypes.string || null,
    last_name: PropTypes.string || null,
    email: PropTypes.string || null,
    username: PropTypes.string || null,
    id: PropTypes.string || null,
  }),
};
