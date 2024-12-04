import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed"],
    default: "Pending",
    required: true,
  },
  assigne: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId : {
    ref : "User",
    type : mongoose.Types.ObjectId,
    required : true
  },
},{timestamps : true});

const Task = mongoose.model<ITask>("Task",taskSchema)

export default Task