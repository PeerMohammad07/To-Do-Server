"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../infrastructure/utils/customError"));
const statusCodeEnum_1 = require("../enums/statusCodeEnum");
class TaskUseCase {
    constructor(userRepository, taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }
    getAllTasks(userId, status, assignee, date) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.userRepository.checkUser(userId);
            if (!userExists) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND, "User Not Found");
            }
            const query = { userId };
            if (status) {
                query.status = status;
            }
            if (assignee) {
                query.assignee = assignee;
            }
            if ((date === null || date === void 0 ? void 0 : date.startDate) && (date === null || date === void 0 ? void 0 : date.endDate)) {
                query.dueDate = {
                    $gte: new Date(date.startDate),
                    $lte: new Date(date.endDate),
                };
            }
            console.log(query);
            const response = yield this.taskRepository.getAllTasks(query);
            if (!response) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "Failed to get all tasks");
            }
            return {
                status: true,
                message: "Succesfully get all tasks",
                data: response
            };
        });
    }
    addTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.userId || !data.status || !data.assignee || !data.title || !data.description || !data.dueDate) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "All fields are required");
            }
            console.log(data.status);
            const response = yield this.taskRepository.addTask(data);
            if (!response) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "Failed to create task");
            }
            return {
                status: true,
                message: "Task created successfully",
                data: response
            };
        });
    }
    editTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data._id || !data.assignee || !data.title || !data.description || !data.dueDate) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "All fields are required");
            }
            const response = yield this.taskRepository.editTask(data);
            if (!response) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "Failed to edit task");
            }
            return {
                status: true,
                message: "Task updated successfully",
                data: response
            };
        });
    }
    deleteTask(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !taskId) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.BAD_REQUEST, "UserId and taskId is required");
            }
            const response = yield this.taskRepository.deleteTask(userId, taskId);
            return {
                status: true,
                message: "Task deleted Successfully",
                data: response
            };
        });
    }
}
exports.default = TaskUseCase;
