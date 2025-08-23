import WorkoutPlan from "../models/WorkoutPlan.js";

export const uploadPlan = async (req, res) => {
  try {
    const { memberId } = req.params;
    if (!req.file) return res.status(400).json({ message: "PDF is required" });
    const plan = await WorkoutPlan.create({
      member: memberId,
      title: req.body.title || "Workout Plan",
      pdf: `/uploads/${req.file.filename}`,
      assignedBy: req.user._id,
      classRef: req.body.classRef || null,
    });
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMyPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ member: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin can view a specific member's plans
export const getPlansByMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const plans = await WorkoutPlan.find({ member: memberId }).sort({
      createdAt: -1,
    });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
