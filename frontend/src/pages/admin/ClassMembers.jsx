import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ClassMembers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classData = state?.classData;

  if (!classData) {
    return (
      <div className="p-6">
        <p>No class data found. Please go back.</p>
        <button
          onClick={() => navigate("/classes")}
          className="bg-blue-500 text-white px-3 py-1 rounded mt-3"
        >
          Back to Classes
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{classData.name} - Members</h2>
      <p className="mb-4">{classData.description}</p>

      <h3 className="text-xl font-semibold mb-2">
        Schedule: {new Date(classData.schedule).toLocaleDateString()}
      </h3>

      <h3 className="text-xl font-semibold mb-2">
        Capacity: {classData.capacity}
      </h3>

      <table className="table-auto border-collapse border border-gray-400 w-full text-left mt-4">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {classData.members.length > 0 ? (
            classData.members.map((member) => (
              <tr key={member._id}>
                <td className="border p-2">{member.name}</td>
                <td className="border p-2">{member.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="border p-2 text-center">
                No members joined yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassMembers;
