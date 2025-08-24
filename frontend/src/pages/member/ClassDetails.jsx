import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have auth context
import api from "../../api/axios";

const ClassesDetails = () => {
  const { id } = useParams();
  console.log("class-id", id);
  const { user, token } = useAuth();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollMsg, setEnrollMsg] = useState("");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const res = await api.get(`/classes/getClassById/${id}`);
        setClassDetails(res.data);
        console.log("idClass", res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load class details");
      } finally {
        setLoading(false);
      }
    };
    fetchClassDetails();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      setEnrollMsg("Please login to enroll");
      return;
    }
    try {
      const res = await api.post(
        `/classes/select/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrollMsg(res.data.message);
      // ✅ Update local state instantly
      setClassDetails((prev) => ({
        ...prev,
        members: [...prev.members, user], // add current user to members
      }));
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || "Enrollment failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const isFull = classDetails.members.length >= classDetails.capacity;
  const isEnrolled = classDetails.members.some(
    (member) => member._id === user._id
  );

  const btnDisabled = isFull || isEnrolled;
  const btnText = isEnrolled
    ? "Already Enrolled"
    : isFull
    ? "Class Full"
    : "Enroll in Class";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">{classDetails.name}</h1>
      <p className="mb-2">
        <span className="font-semibold">Schedule:</span>{" "}
        {new Date(classDetails.schedule).toLocaleString()}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Description:</span>{" "}
        {classDetails.description || "No description provided"}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Capacity:</span>{" "}
        {classDetails.members.length}/{classDetails.capacity}
      </p>

      {enrollMsg && <p className="text-green-600 my-2">{enrollMsg}</p>}

      {user && (
        <button
          onClick={handleEnroll}
          disabled={btnDisabled}
          className={`px-4 py-2 mt-4 rounded text-white ${
            btnDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {btnText}
        </button>
      )}
    </div>
  );
};

export default ClassesDetails;
