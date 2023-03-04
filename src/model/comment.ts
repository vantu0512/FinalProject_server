import { Schema } from "mongoose";
import mongoose from "mongoose";

const commentSchema = new Schema(
  {
    userName: { type: String, required: true, ref: "users" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "products" },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", commentSchema);
