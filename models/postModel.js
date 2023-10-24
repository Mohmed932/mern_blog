import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
export const Posts = model("Posts", PostSchema);
