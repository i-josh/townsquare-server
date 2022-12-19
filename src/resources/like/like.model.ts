import { Schema, model, Types } from "mongoose";
import Like from "./like.interface.js";

const LikeSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
    },
    commentId: {
      type: Types.ObjectId,
      ref: "Comment",
    },
    type: {
      type: String,
      enum: ["comment", "post"],
      required: [true, "type is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<Like>("Like", LikeSchema);
