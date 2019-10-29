import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    age: Number,
    gender: String
  },
  {
    timestamps: true
  }
);

// create the user model from schema
export const UserModel = mongoose.model("User", userSchema);
