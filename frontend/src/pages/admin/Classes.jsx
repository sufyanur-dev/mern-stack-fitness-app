import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    schedule: "",
    capacity: "",
  });
  const navigate = useNavigate();

  const handleViewMembers = (cls) => {
    navigate(`/classes/members`, { state: { classData: cls } }); // Navigate to members page
  };

  const fetchClasses = async () => {
    try {
      const { data } = await api.get("/classes/getAllClasses");
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const openModal = (cls = null) => {
    setEditingClass(cls);
    setFormData(
      cls
        ? {
            name: cls.name,
            description: cls.description,
            schedule: cls.schedule,
            capacity: cls.capacity,
          }
        : { name: "", description: "", schedule: "", capacity: "" }
    );
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingClass(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await api.put(`/classes/updateClass/${editingClass._id}`, formData);
      } else {
        await api.post("/classes/createClass", formData);
      }
      fetchClasses();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await api.delete(`/classes/deleteClass/${id}`);
        fetchClasses();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Classes</h2>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Class
        </button>
      </div>
      <div className="h-[calc(100vh-120px)] overflow-y-auto overflow-x-auto bg-white rounded shadow">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Schedule</th>
              <th className="p-2 border">Capacity</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.length > 0 ? (
              classes.map((cls) => (
                <tr key={cls._id}>
                  <td className="p-2 border">{cls.name}</td>
                  <td className="p-2 border">{cls.description}</td>
                  <td className="p-2 border">{cls.schedule.split("T")[0]}</td>
                  <td className="p-2 border">{cls.capacity}</td>
                  <td className="p-2 border space-x-2 space-y-1.5">
                    <button
                      onClick={() => openModal(cls)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cls._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewMembers(cls)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      View Members
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className=" p-2 border text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow w-96">
            <h3 className="text-xl font-bold mb-4">
              {editingClass ? "Edit Class" : "Add Class"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Class Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                type="date"
                name="schedule"
                value={formData.schedule ? formData.schedule.split("T")[0] : ""}
                onChange={handleChange}
                className="border p-2 w-full"
                required
                min={todayDate}
              />

              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {editingClass ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Classes;
