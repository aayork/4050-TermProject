import { UserCard } from "../../components/UserCard";
import { useState, useEffect } from "react";
import { EditUserModal } from "../../components/EditUserModal";
import { Loading } from "../../components/Loading";
//import {getUsers} from "../../utils/API"

export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const openAddUserModal = () => {
    setSelectedUser(null);
    document.getElementById("empModal").showModal();
  };

  const openEditUserModal = (user) => {
    setSelectedUser(user);
    document.getElementById("empModal").showModal();
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Update the user in the list (edit)
      console.log("Edit user:", userData);
    } else {
      // Add a new user to the list
      console.log("Add new user:", userData);
    }
  };

  //get users
  useEffect(() => {
    //get users

    const fetchUsers = async () => {
      // const users = await getUsers();
      setUsers(people);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const will = {
    first_name: "Will",
    last_name: "Gresham",
    username: "willgresham34",
    email: "willgresham34@gmail.com",
    id: "123131",
    status: "admin",
  };

  const Aidan = {
    first_name: "Aidan",
    last_name: "York",
    username: "aayork",
    email: "aayork@gmail.com",
    id: "15435",
    status: "user",
  };

  const people = [will, Aidan];

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
        <dialog id="empModal" className="modal">
          <EditUserModal
            onClose={() => document.getElementById(empModal).close()}
            onSave={handleSaveUser}
            user={selectedUser}
          />
        </dialog>
      </div>
      <div className="flex flex-col">
        <div className="">
          <h1 className="font-semibold"> Managers:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {users.map((user) => (
              <div className="grid-item min-w-fit" key={user.id}>
                <UserCard user={user} onEdit={() => openEditUserModal(user)} />
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h1 className="font-semibold"> Employees:</h1>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3">
            {users.map((user) => (
              <div className="grid-item min-w-fit" key={user.id}>
                <UserCard user={user} onEdit={() => openEditUserModal(user)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
