import { useState, useEffect } from "react";
import UserTableRow from "../../components/UserTableRow.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [errors, setError] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      let res;
      try {
        res = await fetch("http://localhost:3000/api/users");
      } catch (err) {
        console.error(err);
      }

      if (res) {
        const users = await res.json();
        console.log("USERS", users);
        setUsers(users);
      } else {
        setError({ error: "Unable to fetch users." });
      }
    };

    fetchUsers();
  }, [users.length]);

  const handleValueChange = (e, id, key) => {
    const { value } = e.target;
    const idx = users.findIndex((item) => item.id === id);
    const user = { ...users[idx], [key]: value };
    setUsers(users.map((i) => (i.id === id ? user : i)));
  };

  const handleSubmit = (id) => {
    const idx = users.findIndex((item) => item.id === id);
    const data = users[idx];
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
      {users.length > 0 && (
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
      )}

      {errors.error && <p className="text-red-500">{errors.error}</p>}
    </div>
  );
}

export default Users;
