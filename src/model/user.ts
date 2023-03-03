import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    certificatedId: { type: Number},
    email: { type: String},
    address: { type: String},
    role: {type: String}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
