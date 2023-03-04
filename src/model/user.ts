import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    role: { type: String },
    address: { type: String },
    fullName: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
