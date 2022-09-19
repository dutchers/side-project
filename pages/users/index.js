import { useState, useEffect } from "react";
import UserTableRow from "../../components/UserTableRow.js";

function Users({ users: data }) {
  const [users, setUsers] = useState(data);

  const handleValueChange = (e, id, key) => {
    const { value } = e.target;
    const idx = users.findIndex((item) => item.id === id);
    const user = { ...users[idx], [key]: value };
    setUsers(users.map((i) => (i.id === id ? user : i)));
  };

  const handleSubmit = (id) => {
    const idx = users.findIndex((item) => item.id === id);
    const data = users[idx];
    console.log(data);
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="container">
      <h2>Users Page</h2>

      <table className="w-1/2">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            const { name, email, role, id } = user;
            return (
              <UserTableRow
                name={name}
                email={email}
                role={role}
                id={id}
                handleValueChange={handleValueChange}
                handleSubmit={handleSubmit}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Users;

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  return {
    props: {
      users,
    }, // will be passed to the page component as props
  };
}
