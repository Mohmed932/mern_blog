import fs from "fs";
import { Posts } from "../models/postModel.js";
export const CreatePost = async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  const { title, description } = req.body;
  try {
    const newPost = new Posts({
      title,
      description,
      image: newPath,
      author: res.user._id,
    });
    await newPost.save();
    return res.json(newPost);
  } catch (error) {
    console.error(error);
  }
};
