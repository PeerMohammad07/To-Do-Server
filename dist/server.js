"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./infrastructure/routes/userRoutes"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./infrastructure/config/db"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorMiddleware_1 = __importDefault(require("./infrastructure/middleware/errorMiddleware"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cookie_parser_1.default)());
// Setting Cors 
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Use morgan middleware to log HTTP requests
app.use((0, morgan_1.default)("dev"));
// For parsing application/json
app.use(express_1.default.json());
(0, db_1.default)();
app.use("/", userRoutes_1.default);
app.use(errorMiddleware_1.default);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:3000");
});
