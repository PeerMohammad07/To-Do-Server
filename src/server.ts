import dotenv from "dotenv";
import userRouter from "./infrastructure/routes/userRoutes";
import express from "express"
import connectDB from "./infrastructure/config/db";
import cors from "cors"
import morgan from "morgan";
import cookieParser from "cookie-parser"

const app = express();

dotenv.config()

app.use(cookieParser())

// Setting Cors 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Use morgan middleware to log HTTP requests
app.use(morgan("dev"))

// For parsing application/json
app.use(express.json()); 

connectDB()

app.use("/",userRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log("Server is running on http://localhost:3000")
})