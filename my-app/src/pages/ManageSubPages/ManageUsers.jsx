import { UserCard } from "../../components/UserCard";
import { useState, useEffect } from "react";
import { EditUserModal } from "../../components/EditUserModal";
import { Loading } from "../../components/Loading";
import { getAllUsers, updateUser, deleteUser } from "../../utils/API";

export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const openAddUserModal = () => {
    setSelectedUser(null);
    document.getElementById("userModal").showModal();
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    document.getElementById("userModal").showModal();
  };

  const handleSaveUser = async (userData) => {
    if (selectedUser) {
      // Update the user in the list (edit)
      console.log("Edit user:", userData);
      try {
        await updateUser(formState);
        setInitialFormState(formState);
      } catch (error) {
        console.error("Error updating user:", error);
        alert("Failed to update user information.");
      }
    } else {
      // Add a new user to the list
      console.log("Add new user:", userData);
    }
  };

  //get users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loading message="Loading Users" />;
  }

  return (
    <div>
      <div>
        <button
          className="btn my-2 flex items-center"
          onClick={openAddUserModal}
        >
          Add Employee
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.75v14.5m7.25-7.25H4.75"
            />
          </svg>
        </button>
        <dialog id="userModal" className="modal">
          <EditUserModal
            onClose={() => document.getElementById("userModal").close()}
            onSave={handleSaveUser}
            user={selectedUser}
          />
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Managers:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {users
              .filter((user) => user.movie_profile.status == "admin")
              .map((user) => (
                <div className="grid-item min-w-fit" key={user.id}>
                  <UserCard
                    user={user}
                    onEdit={() => openEditUserModal(user)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Employees:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {users
              .filter((user) => user.movie_profile.status == "employee")
              .map((user) => (
                <div className="grid-item min-w-fit" key={user.id}>
                  <UserCard
                    user={user}
                    onEdit={() => openEditUserModal(user)}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Customers:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {users
              .filter((user) => user.movie_profile.status == "customer")
              .map((user) => (
                <div className="grid-item min-w-fit" key={user.id}>
                  <UserCard
                    user={user}
                    onEdit={() => openEditUserModal(user)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
