import { DeleteResult } from "mongoose"
import ITask from "./ITask"
export interface returnMesage {
  status : boolean
  message : string
  data ? : any
}

export interface ITaskUseCase {
  getAllTasks(userId:string):Promise<returnMesage>
  addTask(data:ITask):Promise<returnMesage>
  editTask(data:any):Promise<returnMesage>
  deleteTask(userId:string,taskId:string):Promise<returnMesage>
}


export interface ITaskRepository {
  getAllTasks(userId:string):Promise<ITask[]>
  addTask(data:ITask):Promise<ITask>
  editTask(data:any):Promise<ITask|null>
  deleteTask(userId:string,taskId:string):Promise<DeleteResult>
}