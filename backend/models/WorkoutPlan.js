import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, default: "Workout Plan" },
    pdf: { type: String, required: true },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    classRef: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);
export default WorkoutPlan;
