import { DeleteResult, Model } from "mongoose";
import ITask from "../../infrastructure/interfaces/ITask";
import { ITaskRepository } from "../../infrastructure/interfaces/ITaskRepository";

export default class TaskRepository implements ITaskRepository {
  private task: Model<ITask>

  constructor(task: Model<ITask>) {
    this.task = task
  }

  async getAllTasks(userId: string): Promise<ITask[]> {
    return await this.task.find({ userId })
  }


  async addTask(data: ITask): Promise<ITask> {
    const task = new this.task(data)
    return await task.save()
  }

  async editTask(data: any): Promise<ITask|null> {
    return await this.task.findOneAndUpdate(
        { _id: data.id },     
        { $set: data },        
        { new: true }     
    );
}

  async deleteTask(userId: string, taskId: string): Promise<DeleteResult> {
    return await this.task.deleteOne({ _id: taskId })
  }

}