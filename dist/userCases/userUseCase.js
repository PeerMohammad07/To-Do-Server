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
const statusCodeEnum_1 = require("../enums/statusCodeEnum");
const customError_1 = __importDefault(require("../infrastructure/utils/customError"));
class UserUseCase {
    constructor(userRepository, hashingService, jwtService) {
        this.userRepository = userRepository;
        this.hashingService = hashingService;
        this.jwtService = jwtService;
    }
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield this.userRepository.checkUserExists(data.email);
            if (userExists) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.CONFLICT, "User already exists with this email");
            }
            // Hash password
            data.password = yield this.hashingService.hashing(data.password);
            // Create user in the database
            const user = yield this.userRepository.createUser(data.name, data.email, data.password);
            if (!user) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.INTERNAL_SERVER_ERROR, "Failed to create user.");
            }
            // Generate tokens
            const payload = { id: user._id, name: user.name };
            const token = this.jwtService.generateToken(payload);
            const refreshToken = this.jwtService.generateRefreshToken(payload);
            return {
                status: true,
                message: "User created successfully",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    token,
                    refreshToken,
                },
            };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.checkUserExists(email);
            if (!user) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.NOT_FOUND, "User Not Found");
            }
            const status = yield this.hashingService.compare(password, user.password);
            if (!status) {
                throw new customError_1.default(statusCodeEnum_1.HttpStatusEnum.UNAUTHORIZED, "Incorrect Password");
            }
            const payload = { id: user._id, name: user.name };
            const token = this.jwtService.generateToken(payload);
            const refreshToken = this.jwtService.generateRefreshToken(payload);
            return {
                status: true,
                message: "User Login Successfully",
                data: { token, refreshToken, user },
            };
        });
    }
}
exports.default = UserUseCase;
