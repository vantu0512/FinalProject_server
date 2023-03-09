import { Schema } from "mongoose";
import mongoose from "mongoose";

const accessRightSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "users" },
    expireTime: { type: Date, required: true },
    accessToken: { type: String, required: true },
    isBlocked: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("accessRights", accessRightSchema);
