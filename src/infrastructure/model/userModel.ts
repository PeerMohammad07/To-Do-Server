import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/IUser";

// User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User