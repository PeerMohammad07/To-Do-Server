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
exports.refreshAccessToken = refreshAccessToken;
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtService_1 = __importDefault(require("../utils/jwtService"));
const JwtService = new jwtService_1.default();
const userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.userRefreshToken;
    let userToken = req.cookies.userToken;
    if (!refreshToken) {
        res.status(401).json({ status: false, message: "Not authorized" });
        return;
    }
    if (!userToken || userToken === '' || Object.keys(userToken).length === 0) {
        try {
            const newUserToken = yield refreshAccessToken(refreshToken);
            res.cookie("userToken", newUserToken, {
                httpOnly: true,
                maxAge: 3600000,
                secure: process.env.NODE_ENV != "production"
            });
            userToken = newUserToken;
        }
        catch (error) {
            res.status(401).json({ message: "Failed to refresh access token" });
            return;
        }
    }
    try {
        const decoded = yield JwtService.verifyToken(userToken);
        let user;
        if (decoded) {
            user = yield userModel_1.default.find({ _id: decoded.id });
        }
        if (!user) {
            res.status(401).json({ status: false, message: "Not Authorized, User not found" });
            return;
        }
        req.body.userId = decoded.id;
        next();
    }
    catch (error) {
        if (error.message === "Invalid or expired token") {
            const refreshToken = req.cookies.userRefreshToken;
            if (refreshToken) {
                try {
                    const decodedRefresh = JwtService.verifyRefreshToken(refreshToken);
                    const newAccessToken = JwtService.generateToken({ name: decodedRefresh.name });
                    res.cookie("userToken", newAccessToken, { httpOnly: true, maxAge: 3600000, secure: process.env.NODE_ENV !== "development" });
                    next();
                }
                catch (refreshError) {
                    res.status(401).json({ message: "Refresh token is invalid or expired." });
                    return;
                }
            }
            else {
                res.status(401).json({ message: "Token has expired and no refresh token is available." });
                return;
            }
        }
        else {
            res.status(500).json({ message: "Internal server error." });
            return;
        }
    }
});
function refreshAccessToken(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const decoded = yield JwtService.verifyRefreshToken(refreshToken);
            if (decoded && decoded.name) {
                const newToken = yield JwtService.generateToken({ id: decoded.userId, name: decoded.name });
                return newToken;
            }
        }
        catch (error) {
            throw new Error("Invalid refresh token");
        }
    });
}
exports.default = userAuth;
