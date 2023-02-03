import { Schema, model, Types } from "mongoose";
import Post from "./post.interface.js";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title cannot be empty"],
    },
    body: {
      type: String,
      required: [true, "body cannot be empty"],
    },
    views: {
      type: Number,
    },
    image: {
      type: String,
    },
    sponsored: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: [
        "Sports",
        "Entertainment",
        "Career",
        "Romance",
        "Politics",
        "Business",
        "Education",
        "Health",
        "Properties",
        "Automobiles",
        "Travel",
        "Tech",
      ],
      required: [true, "category is required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre("save", async function (): Promise<void> {
  this.views = 0;
});

export default model<Post>("Post", PostSchema);
