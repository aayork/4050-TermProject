import React, { useState } from "react";
import { requestPasswordReset } from "../utils/API";
import { AuthCard, AuthField } from "../components/AuthCard";

export function ResetPassword() {
  // State to hold the email and message
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Pass the email to the requestPasswordReset function
      const result = await requestPasswordReset(email);
      setMessage("If an account exists, a reset email was sent successfully.");
      console.log(result);
    } catch (error) {
      setMessage(error.message || "Failed to send reset link.");
      console.error(error);
    }
  };

  return (
    <AuthCard
      title="Forgot password"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <a className="link link-primary font-medium" href="/login">
          Back to log in
        </a>
      }
    >
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <AuthField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <button className="btn btn-primary mt-2 w-full" type="submit">
          Send reset link
        </button>
      </form>
      {message && (
        <p className="mt-4 rounded-xl bg-base-200 px-4 py-3 text-sm">{message}</p>
      )}
    </AuthCard>
  );
}

export default ResetPassword;
