import express from "express";
import { register,login } from "../controllers/auth.js";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/",login)

export default authRouter;
