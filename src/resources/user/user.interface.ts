import { Document } from "mongoose";

export default interface User extends Document {
  username: string;
  email: string;
  password: string;
  admin: number;
  rank: number;
  dob: string;
  image: string;
  createJWT():string;
  validatePassword(password: string): Promise<Error | boolean>;
}
