import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { login, confirmEmail } from "../utils/API";
import { AuthCard, AuthField } from "../components/AuthCard";

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
    event.preventDefault();

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
    <AuthCard
      title="Welcome back"
      subtitle="Log in to book seats and manage your orders."
      footer={
        <>
          New to Movie Monkey?{" "}
          <a className="link link-primary font-medium" href="/register">
            Create an account
          </a>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <AuthField
          label="Username"
          name="username"
          type="text"
          autoComplete="username"
          onChange={handleChange}
        />
        <AuthField
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange}
        />
        <a
          href="/reset-password"
          className="link link-hover -mt-1 self-end font-sans text-sm text-monkey-ink/70"
        >
          Forgot password?
        </a>
        <button className="btn btn-primary mt-2 w-full" type="submit">
          Log in
        </button>
      </form>
    </AuthCard>
  );
}
