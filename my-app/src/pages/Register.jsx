import { useState } from "react";
import { register } from "../utils/API";
import { useNavigate } from "react-router-dom";
import { AuthCard, AuthField } from "../components/AuthCard";

export function Register() {
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
    const { name, type, checked, value } = event.target;

    const newValue = type === "checkbox" ? checked : value;
    setFormState({
      ...formState,
      [name]: newValue,
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
    <AuthCard
      title="Create your account"
      subtitle="Join Movie Monkey to book tickets in seconds."
      footer={
        <>
          Already have an account?{" "}
          <a className="link link-primary font-medium" href="/login">
            Log in
          </a>
        </>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AuthField
            label="First name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            onChange={handleChange}
          />
          <AuthField
            label="Last name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            onChange={handleChange}
          />
        </div>
        <AuthField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          onChange={handleChange}
        />
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
          autoComplete="new-password"
          onChange={handleChange}
        />
        <AuthField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-base-200 px-4 py-3">
          <input
            type="checkbox"
            name="receive_promotions"
            onChange={handleChange}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-sm text-monkey-ink/80">
            Email me about promotions and deals
          </span>
        </label>
        <button className="btn btn-primary mt-2 w-full" type="submit">
          Create account
        </button>
      </form>
    </AuthCard>
  );
}
