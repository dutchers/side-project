import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function User(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const { user: id } = router.query;
      console.log(id, "id");
      console.log(router.query);
      const res = await fetch(`http://localhost:3000/api/users?user=${id}`);
      const user = await res.json();
      console.log(user, "user");

      setUser(user[0]);
    };

    getUser();
  }, [user.length]);

  console.log(session, status);

  if (session && session.user.role === "admin") {
    return (
      <div>
        <h1>Admin</h1>
        <p>Welcome to the Admin Portal, {user.name}!</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>You are not authorized to view this page!</h1>
      </div>
    );
  }
}
