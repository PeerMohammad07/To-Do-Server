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
class UserController {
    constructor(userUseCase) {
        this.userUseCase = userUseCase;
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }
    setAuthCookies(res, token, refreshToken) {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
        };
        res.cookie("userToken", token, Object.assign(Object.assign({}, cookieOptions), { maxAge: 3600000 }));
        res.cookie("userRefreshToken", refreshToken, Object.assign(Object.assign({}, cookieOptions), { maxAge: 30 * 24 * 60 * 60 * 1000 }));
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const response = yield this.userUseCase.register({ name, email, password });
                this.setAuthCookies(res, response.data.token, response.data.refreshToken);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({
                    status: true,
                    message: response.message,
                    data: response.data,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const response = yield this.userUseCase.login(email, password);
                this.setAuthCookies(res, response.data.token, response.data.refreshToken);
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({
                    status: true,
                    message: response.message,
                    data: response.data.user,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.cookie("userToken", "", { maxAge: 0 });
                res.cookie("userRefreshToken", "", { maxAge: 0 });
                res.status(statusCodeEnum_1.HttpStatusEnum.OK).json({ status: true, message: "User logout successfully" });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserController;
