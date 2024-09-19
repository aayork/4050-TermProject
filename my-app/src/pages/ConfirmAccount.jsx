import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { confirmEmail } from "../utils/API";

export function ConfirmAccount() {
  const { key } = useParams();

  useEffect(() => {
    const confirmAccount = async () => {
      if (key) {
        try {
          await confirmEmail(key);

          alert("Your account has been confirmed");
        } catch (error) {
          alert(error);
        }
      }
    };

    confirmAccount();
  }, [key]);

  return (
    <div className="bg-monkey-white flex justify-center items-center">
      <div className="bg-monkey-green w-1/4 flex flex-col items-center mt-12 p-2 rounded-md">
        <h1 className="text-xl text-white p-2">
          Your Account has been confirmed.
        </h1>
        <h2 className="text-white">
          You may close this page or go to the login page
        </h2>
        <button className="bg-monkey-white w-fit mt-4 p-1 rounded-md">
          <a href="/login">Go to Login</a>
        </button>
      </div>
    </div>
  );
}
