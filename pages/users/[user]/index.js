import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function User(props) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      const { user: id } = router.query;
      let res;
      try {
        res = await fetch(`http://localhost:3000/api/users?user=${id}`);
      } catch (err) {
        console.error(err);
      }

      if (res) {
        const user = await res.json();
        setUser(user[0]);
      } else {
        setUser({ error: "Could not find user with Id Provided" });
      }
    };

    getUser();
  }, [user.length]);

  if (session && session.user.role === "admin" && !user.error) {
    return (
      <div className="container mx-auto flex justify-center items-center min-h-screen">
        <Link
          href="/maps/new"
          className="border-solid border gray-900 px-8 py-2 rounded-md hover:top-px"
        >
          Create Map
        </Link>
      </div>
    );
  } else if (user.error) {
    <p className="text-red-600">{user.error}</p>;
  } else {
    return (
      <div>
        <h1>You are not authorized to view this page!</h1>
      </div>
    );
  }
}
