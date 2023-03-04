import { Schema } from "mongoose";
import mongoose from "mongoose";

const newSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("news", newSchema);
