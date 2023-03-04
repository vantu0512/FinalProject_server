import { Schema } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
    datePublish: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("products", productSchema);
