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
class TaskRepository {
    constructor(task) {
        this.task = task;
    }
    getAllTasks(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.task.find(query);
        });
    }
    addTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new this.task(data);
            return yield task.save();
        });
    }
    editTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data.status);
            return yield this.task.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true });
        });
    }
    deleteTask(userId, taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.task.deleteOne({ _id: taskId });
        });
    }
}
exports.default = TaskRepository;
