import { EmployeeCard } from "../../components/EmployeeCard";

export function ManageEmployees() {
  const will = {
    first_name: "Will",
    last_name: "Gresham",
    username: "willgresham34",
    email: "willgresham34@gmail.com",
    id: "123131",
  };

  const aidan = {
    first_name: "Aidan",
    last_name: "York",
    username: "aayork",
    email: "aayork@gmail.com",
    id: "15435",
  };

  const people = [will, aidan];

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={() => document.getElementById("addMovieModal").showModal()}
        >
          Add Employee
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
        <dialog id="addMovieModal" className="modal">
          <div className="modal-box">
            <h3 className="font-semibold text-lg">Add New Employee</h3>
            <div className="border border-monkey-green"></div>
            <div className="flex flex-col gap-2 py-2">
              <label className="input input-bordered flex  input-primary items-center gap-2">
                First Name :
                <input type="text" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered  input-primary flex items-center gap-2">
                Last Name :
                <input type="text" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Email :
                <input type="text" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Username :
                <input type="text" className="grow" placeholder="" />
              </label>
              <label className="input input-bordered input-primary flex items-center gap-2">
                Password :
                <input type="text" className="grow" placeholder="" />
              </label>
              <select className="select select-bordered w-full select-primary">
                <option disabled selected>
                  Role
                </option>
                <option>Manager</option>
                <option>Employee</option>
              </select>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary btn-sm mx-2 text-monkey-white">
                  Close
                </button>
                <button className="btn btn-primary btn-sm text-monkey-white">
                  Add
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Managers:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {people.map((person) => (
              <div className="grid-item min-w-fit" key={person.id}>
                <EmployeeCard employee={person} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Employees:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {people.map((person) => (
              <div className="grid-item min-w-fit" key={person.id}>
                <EmployeeCard employee={person} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
