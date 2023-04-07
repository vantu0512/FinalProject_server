import { Schema } from "mongoose";
import mongoose from "mongoose";

const newSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    contentHTML: { type: String, required: true },
    contentMarkdown: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("news", newSchema);
