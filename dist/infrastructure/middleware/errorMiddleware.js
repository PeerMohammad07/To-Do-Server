"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../utils/customError"));
const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof customError_1.default) {
        res.status(err.statusCode).json({
            status: false,
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        status: false,
        message: 'Something went wrong!',
    });
    return;
};
exports.default = errorMiddleware;
