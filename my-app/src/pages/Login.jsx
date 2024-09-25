import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login, confirmEmail } from "../utils/API";

export function Login() {
  const navigate = useNavigate();
  const { key } = useParams();
  //set init form state
  const [formState, setFormState] = useState({
    username: "",
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

  //if there is a key
  useEffect(() => {
    const confirmAccount = async () => {
      if (key) {
        try {
          await confirmEmail(key);

          alert("Your account has been confirmed\nPlease login :)");
        } catch (error) {
          alert(error);
        }
      }
    };

    confirmAccount();
  }, []);

  // handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    console.log(formState);

    try {
      await login({
        username: formState.username,
        password: formState.password,
      });
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12 min-w-fit w-1/4">
        <h1 className="text-lg mb-2 text-white font-semibold ">Login</h1>
        <div className="border"></div>
        <form action="" onSubmit={handleFormSubmit}>
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
