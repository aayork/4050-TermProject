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

  const cancel = async (event) => {
    event.preventDefault();
    // setFormState(initForm);
    document.getElementById("addCard").close();
  };

  return (
    <div>
      {loggedIn ? (
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="">
            <div className="card">
              <div className="card-title flex justify-between px-2">
                <div>Profile Details</div>
                <button
                  className="btn-primary btn btn-sm text-white"
                  onClick={toggleEditMode}
                >
                  {isEditable ? "Save" : "Edit"}
                </button>
              </div>
              <form action="">
                <div className="flex flex-col gap-2 py-2">
                  <label className="input input-bordered flex input-primary items-center gap-2">
                    <div className="font-semibold">First Name :</div>
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
                    <div className="font-semibold">Last Name :</div>
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
                    <div className="font-semibold">Email :</div>
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
                    <div className="font-semibold">Username :</div>
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
                  <button className="btn btn-primary btn-sm text-lg text-white">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">Saved Cards</div>
              <div className="card-content"></div>
              <button
                className="btn btn-primary btn-sm text-lg text-white"
                onClick={() => document.getElementById("addCard").showModal()}
              >
                Add Card
              </button>
              <dialog id="addCard" className="modal">
                <div className="modal-box">
                  <h3 className="font-semisemibold text-lg">
                    Add Credit/Debit Card
                  </h3>
                  <div className="border border-monkey-green"></div>
                  <form className="flex flex-wrap gap-3 w-full py-2">
                    <label className="relative w-full flex flex-col">
                      <span className="font-semibold">Name on Card</span>
                      <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
                        type="text"
                        name="card_name"
                        placeholder="John Doe"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.66-5.33-4-8-4z"
                        />
                      </svg>
                    </label>

                    <label className="relative w-full flex flex-col">
                      <span className="font-semibold">Card number</span>
                      <input
                        className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
                        type="text"
                        name="card_number"
                        placeholder="0000 0000 0000"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="relative flex-1 flex flex-col">
                        <span className="font-semibold">Expiration date</span>
                        <input
                          className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
                          type="text"
                          name="expire_date"
                          placeholder="MM/YYYY"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </label>

                      <label className="relative flex-1 flex flex-col">
                        <span className="font-semibold flex items-center gap-2">
                          CVC/CVV
                          <span className="relative group">
                            <span className="hidden group-hover:flex justify-center items-center px-2 py-1 text-xs absolute -right-2 transform translate-x-full -translate-y-1/2 w-max top-1/2 bg-monkey-green rounded text-white">
                              3 digits on back of card
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                        </span>
                        <input
                          className="rounded-md peer pl-12 pr-2 py-2 border-2 border-monkey-green placeholder-gray-300"
                          type="text"
                          name="card_cvc"
                          placeholder="&bull;&bull;&bull;"
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-black peer-placeholder-shown:text-gray-300 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </label>
                    </div>

                    <div className="modal-action w-full grid grid-cols-2">
                      <button
                        className="btn btn-secondary btn-sm text-monkey-white"
                        onClick={cancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary btn-sm text-monkey-white"
                        type="submit"
                        onClick={cancel}
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </dialog>
            </div>
          </div>
          {/* right column start */}
          <div className="">
            <div className="card">
              <div className="card-title px-2">Past Orders</div>
              <div className="card-content"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="card flex justify-center">
            <div className="font-semisemibold text-xl">
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
