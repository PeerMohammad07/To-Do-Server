import express from "express";
import UserController from "../../adapters/controllers/userController";
import UserUseCase from "../../userCases/userUseCase";
import UserRepository from "../../adapters/repository/userRepository";
import User from "../model/userModel";
import jwtService from "../utils/jwtService";
import hashingService from "../utils/hashingService";
import TaskUseCase from "../../userCases/taskUseCase";
import TaskRepository from "../../adapters/repository/taskRepository";
import Task from "../model/taskModel";
import TaskController from "../../adapters/controllers/taskController";
import userAuth from "../middleware/userAuth";

const userRouter = express.Router();

const userRepository = new UserRepository(User)
const JwtService = new jwtService()
const HashingService = new hashingService()
const userUseCase = new UserUseCase(userRepository,HashingService,JwtService)
const userController = new UserController(userUseCase)
const taskRepository = new TaskRepository(Task)
const taskUseCase = new TaskUseCase(userRepository,taskRepository)
const taskController = new TaskController(taskUseCase)

userRouter.post("/auth/login",userController.login);
userRouter.post("/auth/register",userController.register);
userRouter.post("/auth/logout",userController.logout)

userRouter.get("/tasks",userAuth,taskController.getTasks)
userRouter.post("/tasks",userAuth,taskController.addTask)
userRouter.put("/tasks/:id",userAuth,taskController.editTask)
userRouter.delete("/tasks/:id",userAuth,taskController.deleteTask)

export default userRouter