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
Object.defineProperty(exports, "__esModule", { value: true });
const statusCodeEnum_1 = require("../../enums/statusCodeEnum");
class TaskController {
    constructor(taskUseCase) {
        this.taskUseCase = taskUseCase;
        this.getTasks = this.getTasks.bind(this);
        this.addTask = this.addTask.bind(this);
        this.editTask = this.editTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    getTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                const { status, assigne, date } = req.query;
                const response = yield this.taskUseCase.getAllTasks(userId, status, assigne, date);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    addTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, title, description, status, dueDate, assignee } = req.body;
                const data = {
                    userId,
                    title,
                    description,
                    dueDate,
                    assignee,
                    status
                };
                const response = yield this.taskUseCase.addTask(data);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    editTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.id;
                const { title, description, status, dueDate, assignee } = req.body;
                const data = {
                    _id: taskId,
                    title,
                    description,
                    status,
                    dueDate,
                    assignee
                };
                const response = yield this.taskUseCase.editTask(data);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskId = req.params.id;
                const userId = req.body.userId;
                const response = yield this.taskUseCase.deleteTask(userId, taskId);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = TaskController;
