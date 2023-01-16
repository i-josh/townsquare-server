import { Document } from "mongoose";
import User from "../user/user.interface.js";

export default interface Post extends Document {
  title: string;
  body: string;
  views: number;
  category: string;
  createdBy: string;
  likes: User[];
  image: string;
  sponsored: boolean;
}
