import { Document } from "mongoose";

export default interface Comment extends Document {
  userId: string;
  postId: string;
  comment: string;
  reply: string;
  replyUser: string;
}
