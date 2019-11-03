import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "user" },
    gender: { type: String, default: "male" },
    birthDate: { type: Date, default: Date.now() },
    role: { type: String, default: "user" },
    tokenVersion: { type: String, default: "" }
  },
  {
    timestamps: true
  }
);

// create the user model from schema
export default mongoose.model("User", userSchema);
