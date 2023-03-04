import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, required: true, ref: "carts" },
    quantity: { type: Number, required: true },
    receiveAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orderSchema);
