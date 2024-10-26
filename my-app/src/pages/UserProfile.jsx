import { useEffect, useState } from "react";
import {
  getUser,
  updateUser,
  deleteUser,
  getPayments,
  createPayment,
} from "../utils/API";
import { Loading } from "../components/Loading";
import { PaymentCard } from "../components/PaymentCard";
import { AddCardModal } from "../components/AddCardModal";

export function UserProfile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    promotion: false,
  });

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    promotion: false,
  });
  const [payments, setPayments] = useState([]);

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
          const fetchedFormState = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            username: user.username,
            promotion: user.promotion,
          };
          setFormState(fetchedFormState);
          setInitialFormState(fetchedFormState);

          const payments = await getPayments(user.id);
          setPayments(payments);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };

    getUserInfo();
  }, []);

  const toggleEditMode = async () => {
    if (isEditable) {
      // Check if form state was changed
      const formChanged =
        JSON.stringify(formState) !== JSON.stringify(initialFormState);

      if (formChanged) {
        try {
          // Call update API method here
          await updateUser(formState);
          setInitialFormState(formState); // Update initial state after successful save
          alert("User updated successfully");
        } catch (error) {
          alert("Error updating user: " + error.message);
        }
      }
    }
    setIsEditable(!isEditable);
  };

  const cancel = (event) => {
    event.preventDefault();
    // Revert form state to initial values when canceled
    setFormState(initialFormState);
    document.getElementById("addCard").close();
  };

  if (loading) {
    return <Loading message="Loading User" />;
  }

  const deleteCard = (cardId) => {
    console.log("Deleting Card " + cardId);
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
                  <div className="w-full flex ">
                    <label className="label cursor-pointer">
                      <span className="label-text text-lg">
                        Do you wish to receive promotions?{" "}
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox checkbox-primary checkbox-sm mx-2"
                      />
                    </label>
                  </div>

                  <button className="btn btn-primary btn-sm text-lg text-white">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">Saved Cards</div>
              <div className="card-content">
                {payments.map((card) => (
                  <div className="grid-item min-w-fit" key={card.name}>
                    <PaymentCard card={card} onDelete={deleteCard(card.id)} />
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary btn-sm text-lg text-white"
                onClick={() => document.getElementById("addCard").showModal()}
              >
                Add Card
              </button>
              <dialog id="addCard" className="modal">
                <AddCardModal
                  onClose={() => document.getElementById("addCard").close()}
                />
              </dialog>
            </div>
          </div>
          {/* Right column */}
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
