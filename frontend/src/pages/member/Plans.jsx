import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const Plan = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get("/workouts/mine");
      setPlans(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Workout Plans</h2>
      <ul>
        {plans.map((p) => (
          <li key={p._id} className="mb-2">
            <strong>{p.title}</strong>{" "}
            <a
              href={`http://localhost:5000${p.pdf}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plan;
