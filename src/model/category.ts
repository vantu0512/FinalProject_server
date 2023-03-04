import { Schema } from "mongoose";
import mongoose from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("categories", categorySchema);
