import { Document } from "mongoose";

export default interface Like extends Document {
  userId: string;
  postId: string;
  commentId: string;
  type:string;
}
