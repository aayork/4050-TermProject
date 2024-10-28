import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { confirmPasswordReset } from "../utils/API";

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

  // Confirm account if there is a key
  useEffect(() => {
    const confirmAccount = async () => {
      if (token) {
        try {
          await confirmEmail(token);
          alert(
            "Your account has been confirmed. You can now set a new password.",
          );
        } catch (error) {
          alert("An error occurred while confirming your account.");
        }
      }
    };

    confirmAccount();
  }, [token]);

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (formState.password !== formState.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await confirmPasswordReset(uid, token, formState.password);
      alert("Password reset successful!");
    } catch (error) {
      alert("An error occurred while resetting your password.");
    }
  };

  return (
    <div className="flex justify-center align-center h-full">
      <div className="bg-monkey-green p-4 flex flex-col justify-between rounded-md m-12 min-w-fit w-1/4">
        <h1 className="text-lg mb-2 text-white font-semibold">
          Reset Password
        </h1>
        <div className="border"></div>
        <form onSubmit={handleFormSubmit}>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">New Password</label>
            <input
              className="password text-black px-1 rounded"
              name="password"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="text-white flex flex-col my-2">
            <label className="text-sm">Confirm Password</label>
            <input
              className="confirmPassword text-black px-1 rounded"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <button
              className="bg-monkey-white mt-4 mb-1 rounded-md"
              type="submit"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
