import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
