import ITask from "../infrastructure/interfaces/ITask";
import { ITaskRepository, ITaskUseCase } from "../infrastructure/interfaces/ITaskRepository";
import IUserRepository from "../infrastructure/interfaces/IUserRepository";
import CustomError from "../infrastructure/utils/customError";
import { HttpStatusEnum } from "../enums/statusCodeEnum";

export default class TaskUseCase implements ITaskUseCase {

  private userRepository: IUserRepository;
  private taskRepository: ITaskRepository

  constructor(userRepository: IUserRepository, taskRepository: ITaskRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  async getAllTasks(userId: string, status: string, assignee: string, date: any) {
    const userExists = await this.userRepository.checkUser(userId)
    if (!userExists) {      
      throw new CustomError(HttpStatusEnum.NOT_FOUND, "User Not Found");
    }
    
    const query: any = { userId };
    
    if (status) {
      query.status = status;
    }
    
    if (assignee) {
      query.assignee = assignee;
    }
    
    if (date?.startDate && date?.endDate) {
      query.dueDate = {
        $gte: new Date(date.startDate), 
        $lte: new Date(date.endDate),  
      };
    }

      console.log(query);
      
    const response = await this.taskRepository.getAllTasks(query)
    
    if (!response) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Failed to get all tasks");
    }

    return {
      status: true,
      message: "Succesfully get all tasks",
      data: response
    }
  }

  async addTask(data: ITask) {
    if (!data.userId ||!data.status || !data.assignee || !data.title || !data.description || !data.dueDate) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }

    console.log(data.status);
    
    const response = await this.taskRepository.addTask(data)
    if (!response) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Failed to create task");
    }

    return {
      status: true,
      message: "Task created successfully",
      data: response
    }
  }


  async editTask(data: any) {
    if (!data._id || !data.assignee || !data.title || !data.description || !data.dueDate) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "All fields are required")
    }

    const response = await this.taskRepository.editTask(data)
    if (!response) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "Failed to edit task");
    }

    return {
      status: true,
      message: "Task updated successfully",
      data: response
    }
  }

  async deleteTask(userId: string, taskId: string) {
    if (!userId || !taskId) {
      throw new CustomError(HttpStatusEnum.BAD_REQUEST, "UserId and taskId is required");
    }

    const response = await this.taskRepository.deleteTask(userId, taskId)

    return {
      status: true,
      message: "Task deleted Successfully",
      data: response
    }
  }
}