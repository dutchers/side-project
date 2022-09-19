import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Input from "./Input";

const Nav = (props) => {
  const { data: session } = useSession();
  console.log(session);
  const [formData, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt, field) => {
    setLoginInfo({ ...formData, [field]: evt.target.value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    signIn(formData);
    e.preventDefault();
  };

  return (
    <nav className="flex justify-between items-center h-24">
      <h3 className="text-3xl font-bold text-black-500">Side Project</h3>
      {session ? (
        <div>
          <h3>Hello, {session.user.name.split(" ")[0]}! </h3>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </nav>
  );
};

export default Nav;
