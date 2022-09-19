import { useState } from "react";
import Input from "./Input.js";
import Link from "next/link";

const UserTableRow = ({
  name,
  email,
  role,
  id,
  handleValueChange,
  handleSubmit,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const buildRoleSelect = (userRole, id) => {
    const roles = ["admin", "editor", "user"];
    return (
      <select name="role" onChange={(e) => handleValueChange(e, id, "role")}>
        {roles.map((role) => {
          const selected = role === userRole;
          return (
            <option value={role} selected={selected}>
              {role}
            </option>
          );
        })}
      </select>
    );
  };

  const handleShowEdit = () => {
    setShowEdit(true);
  };

  const handleHideEdit = () => {
    setShowEdit(false);
  };

  return (
    <tr onMouseEnter={handleShowEdit} onMouseLeave={handleHideEdit}>
      <td>
        {editMode ? (
          <Input
            value={name}
            name="name"
            onChange={(e) => handleValueChange(e, id, "name")}
          />
        ) : (
          <Link href={`/users/${id}`}>{name}</Link>
        )}
      </td>
      <td>
        {editMode ? (
          <Input
            value={email}
            name="email"
            onChange={(e) => handleValueChange(e, id, "email")}
          />
        ) : (
          <p>{email} </p>
        )}
      </td>
      <td>{editMode ? buildRoleSelect(role, id) : <p>{role}</p>}</td>
      <td className="w-12">
        {editMode && (
          <button
            onClick={() => {
              setEditMode(false);
              handleSubmit(id);
            }}
          >
            submit
          </button>
        )}
        {showEdit && !editMode && (
          <button onClick={() => setEditMode(true)}>edit</button>
        )}
      </td>
    </tr>
  );
};

export default UserTableRow;
