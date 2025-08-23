import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    schedule: { type: Date, required: true },
    capacity: { type: Number, default: 20 },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const ClassModel = mongoose.model("Class", classSchema);
export default ClassModel;
