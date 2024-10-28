import React, { useState } from "react";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/password/reset/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        const data = await response.json();
        setMessage(data.detail || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="p-2">
      <h2>Forgot Password</h2>
      <div className="inline-flex">
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button
            className="group flex h-min m-8 items-center disabled:opacity-50 disabled:hover:opacity-50 hover:translate-y-1 transition-transform justify-center ring-none rounded-lg shadow-lg font-semibold py-1 px-2 font-dm focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-violet-500 border-b-violet-700 disabled:border-0 disabled:bg-violet-500 disabled:text-white ring-white text-white border-b-4 hover:border-0 active:border-0 hover:text-gray-100 active:bg-violet-800 active:text-gray-300 focus-visible:outline-monkey-green text-sm sm:text-base dark:bg-green-800 dark:border-gray-700 dark:border-b-green-950"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPassword;
