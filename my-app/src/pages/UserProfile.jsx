import { useEffect, useState } from "react";
import { getUser } from "../utils/API";
export function UserProfile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUser();
        setLoggedIn(true);

        if (user) {
          setFormState({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            username: user.username,
          });
        }
      } catch (error) {
        alert(error);
      }
    };

    getUserInfo();
  }, []);

  const toggleEditMode = () => {
    if (isEditable) {
      //call update method here
    }
    setIsEditable(!isEditable);
  };

  return (
    <div>
      {loggedIn ? (
        <div className="w-full">
          <div className="card">
            <div className="card-title flex justify-between px-2">
              <div>Profile Details</div>
              <button
                className="btn-primary btn btn-sm"
                onClick={toggleEditMode}
              >
                {isEditable ? "Save" : "Edit"}
              </button>
            </div>
            <form action="">
              <div className="flex flex-col gap-2 py-2">
                <label className="input input-bordered flex  input-primary items-center gap-2">
                  First Name :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                </label>
                <label className="input input-bordered  input-primary flex items-center gap-2">
                  Last Name :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Email :
                  <input
                    type="text"
                    className="grow"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                </label>
                <label className="input input-bordered input-primary flex items-center gap-2">
                  Username :
                  <input
                    type="text"
                    className="grow"
                    placeholder=""
                    name="username"
                    value={formState.username}
                    onChange={handleChange}
                    readOnly={!isEditable}
                  />
                </label>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="card flex justify-center">
            <div className="font-semibold text-xl">
              You need to login to access this page
            </div>
            <br />
            <div className="self-center">
              Click{" "}
              <a className="text-blue-700 underline" href="/login">
                here
              </a>{" "}
              to login
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
