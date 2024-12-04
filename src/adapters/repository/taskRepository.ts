import { DeleteResult, Model } from "mongoose";
import ITask from "../../infrastructure/interfaces/ITask";
import { ITaskRepository } from "../../infrastructure/interfaces/ITaskRepository";
import { log } from "console";

export default class TaskRepository implements ITaskRepository {
  private task: Model<ITask>

  constructor(task: Model<ITask>) {
    this.task = task
  }

  async getAllTasks(query: any): Promise<ITask[]> {
    return await this.task.find(query)
  }


  async addTask(data: ITask): Promise<ITask> {
    const task = new this.task(data)
    return await task.save()
  }

  async editTask(data: any): Promise<ITask|null> {    
    console.log(data.status);
    
    return await this.task.findOneAndUpdate(
        { _id: data._id },     
        { $set: data },        
        { new: true }     
    );
}

  async deleteTask(userId: string, taskId: string): Promise<DeleteResult> {
    return await this.task.deleteOne({ _id: taskId })
  }

}