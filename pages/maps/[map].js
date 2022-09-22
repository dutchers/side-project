import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Map = (props) => {
  const router = useRouter();
  const { map: id } = router.query;
  const [map, setMap] = useState({});

  useEffect(() => {
    const fetchMap = async () => {
      const res = await fetch(`http://localhost:3000/api/maps/${id}`);
      const map = await res.json();
      console.log(map, id);
      setMap(map[0]);
    };
    if (id) {
      fetchMap();
    }
  }, [map.length, id]);

  console.log(map);
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl">{map.name}</h2>
      <Link href="/places" passHref>
        <a className="text-blue-400 underline">Add places to map</a>
      </Link>
    </div>
  );
};

export default Map;
