import { useState } from "react";
import { useRouter } from "next/router";
import Input from "../../components/Input.js";
const NewMap = (props) => {
  const router = useRouter();
  const [mapState, setMapState] = useState({});

  const handleChange = (evt, field) => {
    const { value, checked, type } = evt.target;
    const data = type === "checkbox" ? checked : value;
    setMapState({ ...mapState, [field]: data });
  };

  const handleSubmit = async (e) => {
    console.log("this is happening");
    e.preventDefault();
    try {
      const resp = await fetch("http://localhost:3000/api/maps", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mapState),
      });
      const map = await resp.json();
      router.push(`/maps/${map.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        placeholder="insert map name"
        label="Map Name"
        onChange={handleChange}
      />
      <Input
        type="checkbox"
        value={mapState.private}
        onChange={handleChange}
        name="private"
      />
      <button
        type="submit"
        className="border-solid border border-gray-300 px-8 py-2 rounded-md hover:top-px"
      >
        Create map
      </button>
    </form>
  );
};

export default NewMap;
