import { useState } from "react";
import { useParams } from "react-router-dom";
import { confirmPasswordReset } from "../utils/API";
import { AuthCard, AuthField } from "../components/AuthCard";

export function ResetConfirm() {
  const { uid, token } = useParams();

  // Set initial form state
  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });

  // Update form fields on change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await confirmPasswordReset(
        uid,
        token,
        formState.password,
        formState.confirmPassword,
      );
      alert("Password reset successful!");
    } catch {
      alert("An error occurred while resetting your password.");
    }
  };

  return (
    <AuthCard title="Reset password" subtitle="Choose a new password for your account.">
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <AuthField
          label="New password"
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
        <button className="btn btn-primary mt-2 w-full" type="submit">
          Reset password
        </button>
      </form>
    </AuthCard>
  );
}
