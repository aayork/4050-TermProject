import { EmployeeCard } from "../../components/EmployeeCard";
import { useState } from "react";

export function ManageEmployees() {
  const initForm = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  };
  const [formState, setFormState] = useState(initForm);

  const cancel = async (event) => {
    event.preventDefault();
    setFormState(initForm);
    document.getElementById("addEmpModal").close();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formState);
    setFormState(initForm);
    document.getElementById("addEmpModal").close();
  };

  const will = {
    first_name: "Will",
    last_name: "Gresham",
    username: "willgresham34",
    email: "willgresham34@gmail.com",
    id: "123131",
  };

  const Aidan = {
    first_name: "Aidan",
    last_name: "York",
    username: "aayork",
    email: "aayork@gmail.com",
    id: "15435",
  };

  const people = [will, Aidan];

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={() => document.getElementById("addEmpModal").showModal()}
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
        <dialog id="addEmpModal" className="modal">
          <div className="modal-box">
            <h3 className="font-semibold text-lg">Add New Employee</h3>
            <div className="border border-monkey-green"></div>
            <form method="dialog" onSubmit={handleFormSubmit}>
              <div className="flex flex-col gap-2 py-2">
                <label className="input input-bordered flex  input-primary items-center gap-2">
                  First Name :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="first_name"
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered  input-primary flex items-center gap-2">
                  Last Name :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="last_name"
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Email :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="email"
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Username :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="username"
                    onChange={handleChange}
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Password :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="password"
                    onChange={handleChange}
                  />
                </label>
                <select
                  className="select select-bordered w-full select-primary"
                  name="role"
                  defaultValue="Role"
                  onChange={handleChange}
                >
                  <option disabled defaultValue="Role">
                    Role
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div className="modal-action">
                <button
                  className="btn btn-primary btn-sm mx-2 text-monkey-white"
                  onClick={cancel}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm text-monkey-white"
                  type="submit"
                  onSubmit={handleFormSubmit}
                >
                  Create
                </button>
              </div>
            </form>
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
