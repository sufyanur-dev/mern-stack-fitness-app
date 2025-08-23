import User from "../models/User.js";

export const listMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }).select("-password");
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });
    const member = await User.create({ name, email, password, role: "member" });
    res.status(201).json({
      _id: member._id,
      name: member.name,
      email: member.email,
      role: member.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.password) delete updates.password; // password change not here
    const member = await User.findOneAndUpdate(
      { _id: id, role: "member" },
      updates,
      { new: true }
    ).select("-password");
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await User.findOneAndDelete({ _id: id, role: "member" });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
