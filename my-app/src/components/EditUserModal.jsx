import { useEffect, useState, useMemo } from "react";

export function EditUserModal({ onClose, onSave, onDelete, user }) {
  const initForm = useMemo(
    () => ({
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      movie_profile: {
        status: "",
        receive_promotions: false,
        address: {
          street: "",
          city: "",
          state: "",
          postalCode: "",
        },
      },
    }),
    []
  );
  const [userDetails, setUserDetails] = useState(initForm);

  useEffect(() => {
    if (user) {
      //if editing populate
      setUserDetails(user);
    } else {
      //if adding clear form
      setUserDetails(initForm);
    }
  }, [user, initForm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserDetails((prevData) => {
      if (name.includes(".")) {
        const keys = name.split(".");
        return {
          ...prevData,
          [keys[0]]: {
            ...prevData[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(userDetails);
    onClose();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(user.id);
    onClose();
  };

  const close = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <div className="modal-box">
      <h1 className="font-semibold text-lg">
        {user ? "Update User" : "Add User"}
      </h1>
      <div className="border border-monkey-green"></div>
      <form method="dialog" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 py-2">
          <label className="input input-bordered flex  input-primary items-center gap-2">
            First Name :
            <input
              type="text"
              className="grow"
              name="first_name"
              value={userDetails.first_name}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered  input-primary flex items-center gap-2">
            Last Name :
            <input
              type="text"
              className="grow"
              name="last_name"
              value={userDetails.last_name}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Email :
            <input
              type="text"
              className="grow"
              name="email"
              onChange={handleChange}
              value={userDetails.email}
            />
          </label>
          <label className="input input-bordered input-primary flex items-center gap-2">
            Username :
            <input
              type="text"
              className="grow"
              name="username"
              onChange={handleChange}
              value={userDetails.username}
            />
          </label>
          {!user && (
            <label className="input input-bordered input-primary flex items-center gap-2">
              Password :
              <input
                type="text"
                className="grow"
                name="password"
                onChange={handleChange}
                value={userDetails.password}
              />
            </label>
          )}
          <select
            className="select select-bordered w-full select-primary"
            name="movie_profile.status"
            value={userDetails.movie_profile.status || ""}
            onChange={handleChange}
          >
            <option disabled value="">
              Role
            </option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </div>
        <div className="modal-action mt-0">
          <button
            className="btn btn-secondary btn-sm text-monkey-white text-white"
            onClick={close}
          >
            Cancel
          </button>
          {user && (
            <button
              className="btn btn-warning btn-sm text-white"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button
            className="btn btn-primary btn-sm text-white"
            onClick={handleSubmit}
          >
            {user ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
