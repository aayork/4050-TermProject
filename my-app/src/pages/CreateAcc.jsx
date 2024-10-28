import { useState } from "react";
import { register } from "../utils/API";
import { useNavigate } from "react-router-dom";

export function CreateAcc() {
  const navigate = useNavigate();
  // set initial form state
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "customer",
    receive_promotions: false,
  });

  //updated fields on change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if confirmed password equal to the password
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match");
    } else {
      try {
        const result = await register({
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          username: formState.username,
          password: formState.password,
          status: formState.status,
          receive_promotions: formState.receive_promotions,
        });

        console.log(result);
        alert(result);
        navigate("/login");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12 min-w-fit w-1/5">
        <h1 className="text-lg mb-2 text-white font-semibold ">
          Create Account
        </h1>
        <div className="border"></div>
        <form action="" onSubmit={handleFormSubmit}>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">First Name</label>
            <input
              className="firstName text-black px-1 rounded"
              name="firstName"
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Last Name</label>
            <input
              className="lastName text-black px-1 rounded"
              type="text"
              name="lastName"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Email</label>
            <input
              className="email text-black px-1 rounded"
              name="email"
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Username</label>
            <input
              className="userName text-black px-1 rounded"
              name="username"
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" text-white flex flex-col my-2">
            <label className="text-sm">Password</label>
            <input
              className="password text-black px-1 rounded"
              name="password"
              type="password"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" text-white flex flex-col my-2">
            <label className="text-sm">Confirm Password</label>
            <input
              className="password text-black px-1 rounded"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            ></input>
          </div>
          <div className="w-full flex ">
            <label className="label cursor-pointer">
              <span className="label-text text-sm text-white">
                Do you wish to receive promotions?{" "}
              </span>
              <input
                type="checkbox"
                defaultChecked
                className="checkbox checkbox-secondary checkbox-sm mx-2"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-monkey-white mt-4 mb-1 rounded-md"
              type="submit"
            >
              Create
            </button>
            <a className="text-xs text-white underline" href="/login">
              Have an account? Login in here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
