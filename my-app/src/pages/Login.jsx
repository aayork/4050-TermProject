import { useState } from "react";
import { login } from "../utils/API";

export function Login() {
  //set init form state
  const [formState, setFormState] = useState({
    email: "",
    password: "",
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

    console.log(formState);

    try {
      await login(formState.email, formState.password);
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error);
    }
  };

  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12 w-1/4">
        <h1 className="text-lg mb-2 text-white font-semibold ">Login</h1>
        <div className="border"></div>
        <form action="" onSubmit={handleFormSubmit}>
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
          <div className="flex flex-col">
            <button
              className="bg-monkey-white mt-4 mb-1 rounded-md"
              type="submit"
            >
              Login
            </button>
            <a className="text-xs text-white underline" href="/createAccount">
              Don&apos;t have an account? Create One!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
