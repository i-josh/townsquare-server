import { Schema, model, Types } from "mongoose";
import Comment from "./comment.interface.js";

const CommentSchema = new Schema(
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
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
    reply: String,
    replyUser: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default model<Comment>("Comment", CommentSchema);
