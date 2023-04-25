import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";
dotenv.config();

const app = express();

// Middleware configuration
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database setup
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db is not connected", err));

app.use(authRouter);
app.use(postRouter);
app.use(userRouter)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server starts at ${port}`);
});
