import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addRemoveFriends,
  allUsers,
  getUserFriends,
} from "../controllers/user.js";

const userRouter = express();

userRouter.get("/allUsers/:id", verifyToken, allUsers);
userRouter.patch(
  "/addOrRemoveFriends/:userId/:friendId",
  verifyToken,
  addRemoveFriends
);
userRouter.get("/userFriends/:id", verifyToken, getUserFriends);


export default userRouter;
