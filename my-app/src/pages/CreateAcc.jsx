import React, { useState } from "react";

export function CreateAcc() {
  // set initial form state
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      console.log(formState);
    }
  };

  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12 w-1/4">
        <h1 className="text-lg mb-2 text-white font-semibold ">
          Create Account
        </h1>
        <div className="border"></div>
        <form action="" onSubmit={handleFormSubmit}>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">First Name</label>
            <input
              className="firstName text-black px-1"
              name="firstName"
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Last Name</label>
            <input
              className="lastName text-black px-1"
              type="text"
              name="lastName"
              onChange={handleChange}
            ></input>
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Email</label>
            <input
              className="userName text-black px-1"
              name="email"
              type="text"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" text-white flex flex-col my-2">
            <label className="text-sm">Password</label>
            <input
              className="password text-black px-1"
              name="password"
              type="password"
              onChange={handleChange}
            ></input>
          </div>
          <div className=" text-white flex flex-col my-2">
            <label className="text-sm">Confirm Password</label>
            <input
              className="password text-black px-1"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            ></input>
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
