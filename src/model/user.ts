import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String },
    password: { type: String, required: true },
    role: { type: String },
    address: { type: String },
    fullName: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
