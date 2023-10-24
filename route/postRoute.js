import { Router } from "express";
import { CreatePost } from "../controller/postscontroller.js";

export const PostRouter = Router();

PostRouter.post("/posts", CreatePost);
