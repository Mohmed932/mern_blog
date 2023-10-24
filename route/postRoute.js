import { Router } from "express";
import multer from "multer";
import { CreatePost } from "../controller/postscontroller.js";
import { verifyToken } from "../middleware/protected.js";

export const PostRouter = Router();
const uploadMiddleware = multer({ dest: "uploads/" });
PostRouter.post(
  "/posts",
  uploadMiddleware.single("image"),
  verifyToken,
  CreatePost
);
