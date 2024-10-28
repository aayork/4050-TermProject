import { useEffect, useState } from "react";
import { getUser, updateUser, getPayments, deletePayment } from "../utils/API";
import { Loading } from "../components/Loading";
import { PaymentCard } from "../components/PaymentCard";
import { AddCardModal } from "../components/AddCardModal";

export function UserProfile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [userId, setUserId] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [initialFormState, setInitialFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    receive_promotions: false,
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    receive_promotions: false,
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
  });
  const [payments, setPayments] = useState([]);

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormState((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormState({
        ...formState,
        [name]: newValue,
      });
    }
  };

  const handleCardAdd = () => {
    document.getElementById("addCard").close();
    setShouldUpdate(!shouldUpdate);
  };

  const deletePaymentCard = async (cardId) => {
    try {
      const result = await deletePayment(cardId);
      console.log(result);
      setShouldUpdate(!shouldUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const user = await getUser();
        setLoggedIn(true);

        console.log(user);
        if (user) {
          const fetchedFormState = {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            username: user.username,
            receive_promotions: user.movie_profile.receive_promotions,
            address: {
              street: user.address?.street || "",
              city: user.address?.city || "",
              state: user.address?.state || "",
              zip: user.address?.zip || "",
            },
          };

          setUserId(user.id);
          setFormState(fetchedFormState);
          setInitialFormState(fetchedFormState);

          const paymentArray = await getPayments(user.id);
          setPayments(paymentArray);
        }
      } catch (error) {
        alert(error);
      }
      setLoading(false);
    };

    getUserInfo();
  }, [shouldUpdate]);

  const toggleEditMode = async () => {
    if (isEditable) {
      const formChanged =
        JSON.stringify(formState) !== JSON.stringify(initialFormState);

      if (formChanged) {
        try {
          await updateUser(formState, userId);
          setInitialFormState(formState);
          alert("User updated successfully");
        } catch (error) {
          alert("Error updating user: " + error.message);
        }
      }
    }
    setIsEditable(!isEditable);
  };

  const cancelEdit = () => {
    setFormState(initialFormState);
    setIsEditable(false);
  };

  if (loading) {
    return <Loading message="Loading User" />;
  }

  return (
    <div>
      {loggedIn ? (
        <div className="w-full grid grid-cols-2 gap-2">
          <div className="">
            <div className="card">
              <div className="card-title flex justify-between px-2">
                <div>Profile Details</div>
                <div className="flex justify-end gap-2">
                  <button
                    className="btn-primary btn btn-sm text-white"
                    onClick={toggleEditMode}
                  >
                    {isEditable ? "Save" : "Edit"}
                  </button>
                  {isEditable && (
                    <button
                      className="btn-secondary btn btn-sm text-white"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              <form action="">
                <div className="flex flex-col gap-2 py-2">
                  <label className="input input-bordered input-primary flex items-center gap-2">
                    <div className="font-semibold">Email :</div>
                    <input
                      type="text"
                      className="grow"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </label>
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
                  <div className="px-2 font-semibold">Billing Address</div>
                  <label className="input input-bordered flex input-primary items-center gap-2">
                    <div className="font-semibold">Street Address:</div>
                    <input
                      type="text"
                      className="grow"
                      name="address.street"
                      value={formState.address.street}
                      onChange={handleChange}
                      readOnly={!isEditable}
                    />
                  </label>
                  <label className="input input-bordered flex input-primary items-center gap-2">
                    <div className="font-semibold">City:</div>
                    <input
                      type="text"
                      className="grow"
                      name="address.city"
                      value={formState.address.city}
                      onChange={handleChange}
                      readOnly={!isEditable}
                    />
                  </label>
                  <label className="input input-bordered flex input-primary items-center gap-2">
                    <div className="font-semibold">State:</div>
                    <input
                      type="text"
                      className="grow"
                      name="address.state"
                      value={formState.address.state}
                      onChange={handleChange}
                      readOnly={!isEditable}
                    />
                  </label>
                  <label className="input input-bordered flex input-primary items-center gap-2">
                    <div className="font-semibold">Zip Code:</div>
                    <input
                      type="text"
                      className="grow"
                      name="address.zip"
                      value={formState.address.zip}
                      onChange={handleChange}
                      readOnly={!isEditable}
                    />
                  </label>
                  <div className="w-full flex ">
                    <label className="label cursor-pointer">
                      <span className="label-text text-lg">
                        Do you wish to receive promotions?
                      </span>
                      <input
                        type="checkbox"
                        name="receive_promotions"
                        checked={formState.receive_promotions}
                        onChange={handleChange}
                        className="checkbox checkbox-primary checkbox-sm mx-2"
                        disabled={!isEditable}
                      />
                    </label>
                  </div>
                  <div className="btn btn-primary btn-sm text-lg text-white">
                    <a href="/reset-password">Reset Password</a>
                  </div>
                </div>
              </form>
            </div>
            <div className="card">
              <div className="card-title">Saved Cards</div>
              <div className="card-content">
                {payments.map((card) => (
                  <div className="w-full" key={card.id}>
                    <PaymentCard
                      card={card}
                      onDelete={() => deletePaymentCard(card.id)}
                    />
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
                  onAdd={() => handleCardAdd()}
                  userId={userId}
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
