import express from "express";
import {
  createPost,
  friendsPosts,
  likePost,
  myPosts,
  allPosts,
  commentPost,
  deletePost,
} from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js";

const postRouter = express();

postRouter.post("/createPost", verifyToken, createPost);
postRouter.get("/myPosts/:id", verifyToken, myPosts);
postRouter.get("/allPosts/:id", verifyToken, allPosts);
postRouter.get("/friendsPosts/:id", verifyToken, friendsPosts);
postRouter.put("/likePost/:userId/:postId", verifyToken, likePost);
postRouter.put("/commentPost/:postId", verifyToken, commentPost);
postRouter.delete("/deletePost/:postId", verifyToken, deletePost);

export default postRouter;
