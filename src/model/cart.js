import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema(
  {
    userName: { type: String, required: true, ref: "users" },
    bookId: { type: Schema.Types.ObjectId, required: true, ref: "books" },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carts", cartSchema);
