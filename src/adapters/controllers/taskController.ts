import { NextFunction, Request, Response } from "express";
import { ITaskUseCase } from "../../infrastructure/interfaces/ITaskRepository";
import { HttpStatusEnum } from "../../enums/statusCodeEnum";
import ITask from "../../infrastructure/interfaces/ITask";

export default class TaskController {
  private taskUseCase : ITaskUseCase

  constructor(taskUseCase:ITaskUseCase){
    this.taskUseCase = taskUseCase
    this.getTasks = this.getTasks.bind(this)
    this.addTask = this.addTask.bind(this)
    this.editTask = this.editTask.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
  }

  async getTasks(req: Request, res: Response, next: NextFunction){
    try {
      const { userId } = req.body;      
      const response = await this.taskUseCase.getAllTasks(userId)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async addTask(req: Request, res: Response, next: NextFunction){
    try {
      const { userId, title, description, dueDate, assigne } = req.body; 
      const data = {
        userId,
        title,
        description,
        dueDate,
        assigne
      }           
      const response = await this.taskUseCase.addTask(data as ITask)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async editTask(req: Request, res: Response, next: NextFunction){
    try {
      const taskId = req.params.id
      const { userId, title, description, dueDate, assigne } = req.body;
      const data = {
        _id:taskId,
        userId,
        title,
        description,
        dueDate,
        assigne
      }      
      const response = await this.taskUseCase.editTask(data)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction){
    try {
      const taskId = req.params.id
      const userId = req.body.userId
      const response = await this.taskUseCase.deleteTask(userId,taskId)
      res.status(HttpStatusEnum.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}