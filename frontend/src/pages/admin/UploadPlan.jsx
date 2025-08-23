import React, { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import SuccessToast from "../../components/SuccessToast";
import ErrorToast from "../../components/ErrorToast";

const UploadPlan = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ member: "", title: "", pdf: null });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const { data } = await api.get("/members/getAllMembers");
        setMembers(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, pdf: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("member", form.member);
      formData.append("title", form.title);
      formData.append("pdf", form.pdf);

      await api.post(`/workouts/upload/${form.member}`, formData);

      SuccessToast("Workout plan uploaded successfully!");
      setForm({ member: "", title: "", pdf: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // clear the file input
      }
    } catch (err) {
      ErrorToast(err.response?.data?.message || "Operation failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Workout Plan</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 xs:w-full sm:w-150 lg:w-150"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="member"
            value={form.member}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Member</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="title"
            placeholder="Plan Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
            ref={fileInputRef}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadPlan;
