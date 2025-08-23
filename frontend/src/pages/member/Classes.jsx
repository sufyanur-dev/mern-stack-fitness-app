import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
      const { data } = await axios.get("/classes/getAllClasses");
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Classes</h2>
      <ul className="list-disc pl-6">
        {classes.map((c) => (
          <li key={c._id} className="mb-2">
            <Link
              to={`/member/classes/${c._id}`}
              className="text-blue-600 hover:underline"
            >
              {c.name}
            </Link>{" "}
            - {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Classes;
