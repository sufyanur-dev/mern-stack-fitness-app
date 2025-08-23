import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerMember = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });
    const user = await User.create({ name, email, password, role: "member" });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const ok = await user.matchPassword(password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const registerAdmin = async (req, res) => {
  try {
    const { name = "Admin", email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "email & password required" });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Admin already exists" });
    user = await User.create({ name, email, password, role: "admin" });
    res.status(201).json({ message: "Admin created", id: user._id });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
