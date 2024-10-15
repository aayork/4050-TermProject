export function EditUserModal({ user }) {
  return (
    <div className="modal-box">
      <h1> Edit User</h1>
      <form>
        <input name="userFirstName" defaultValue={user.first_name}></input>
        <input name="userLastName" defaultValue={user.last_name}></input>
      </form>
    </div>
  );
}
