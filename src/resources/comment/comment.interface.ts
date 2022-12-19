import { Document } from "mongoose";

export default interface Comment extends Document {
  userId: string;
  postId: string;
  data: string;
}
