import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email is invalid",
      ],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
    },
    admin: {
      type: Number,
      default: 0,
    },
    rank: Number,
    dob: {
      type: Date,
      // required: [true, "date of birth is required"],
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (): Promise<void> {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function (): string {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET
    // { expiresIn: process.env.JWT_LIFETIME }
  );
};

UserSchema.methods.validatePassword = async function (
  reqPassword: string
): Promise<boolean> {
  return await bcrypt.compare(reqPassword, this.password);
};

export default model("User", UserSchema);
