import ClassModel from "../models/Class.js";

export const listClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find().populate("members", "name email");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const { name, description, schedule, capacity } = req.body;
    if (!name || !schedule)
      return res.status(400).json({ message: "name & schedule required" });
    const cls = await ClassModel.create({
      name,
      description,
      schedule,
      capacity,
    });
    res.status(201).json(cls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const cls = await ClassModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const cls = await ClassModel.findByIdAndDelete(id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    res.json({ message: "Class deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const cls = await ClassModel.findById(id).populate("members", "name email");

    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(cls);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Member selects a class
export const selectClass = async (req, res) => {
  try {
    const { id } = req.params; // class id
    const userId = req.user._id;
    const cls = await ClassModel.findById(id);
    if (!cls) return res.status(404).json({ message: "Class not found" });
    if (cls.members.includes(userId))
      return res.status(400).json({ message: "Already enrolled" });
    if (cls.members.length >= cls.capacity)
      return res.status(400).json({ message: "Class full" });
    cls.members.push(userId);
    await cls.save();
    res.json({ message: "Enrolled", class: cls });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
