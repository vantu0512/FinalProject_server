import { Schema } from "mongoose";
import mongoose from "mongoose";

const orderSchema = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, required: true, ref: "carts" },
    receiveAddress: { type: String, required: true },
    isPurchase: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orderSchema);
