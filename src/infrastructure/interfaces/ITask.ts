import { Types } from "mongoose";

interface ITask {
  _id? : string;
  title: string;
  description: string;
  status: "Pending" | "Completed"; 
  assigne: string;
  dueDate: Date;
  userId: Types.ObjectId; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

export default ITask;
