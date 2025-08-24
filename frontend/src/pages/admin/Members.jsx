import React, { useEffect, useState } from "react";
import api from "../../api/axios";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/members/getAllMembers");
      setMembers(data);
    } catch (err) {
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddMember = () => {
    setFormData({ name: "", email: "", password: "" });
    setEditMode(false);
    setShowForm(true);
  };

  const handleEditMember = (member) => {
    setFormData({ name: member.name, email: member.email, password: "" });
    setCurrentMember(member);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/members/updateMember/${currentMember._id}`, {
          name: formData.name,
          email: formData.email,
        });
      } else {
        await api.post("/members/createMember", formData);
      }
      setShowForm(false);
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await api.delete(`/members/deleteMember/${id}`);
      fetchMembers();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Members List</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <button
        onClick={handleAddMember}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        + Add Member
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="h-[calc(100vh-120px)] overflow-y-auto overflow-x-auto bg-white rounded shadow">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length > 0 ? (
                members.map((m) => (
                  <tr key={m._id}>
                    <td className="p-2 border">{m.name}</td>
                    <td className="p-2 border">{m.email}</td>
                    <td className="p-2 border space-y-1.5">
                      <button
                        onClick={() => handleEditMember(m)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-2 border">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Member" : "Add Member"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded"
                required
              />
              {!editMode && (
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full border p-2 rounded"
                  required
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
