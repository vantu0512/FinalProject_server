import { Schema } from "mongoose";
import mongoose from "mongoose";

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("carts", cartSchema);
