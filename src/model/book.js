import { Schema } from "mongoose";
import mongoose from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    datePublish: { type: String, required: true },
    pageNumber: { type: Number, required: true },
    category: { type: String, required: true },
    imgUrl: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("books", bookSchema);
