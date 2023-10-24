import { Schema, model } from "mongoose";

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  descrapition: {
    type: String,
    required: true,
  },
  image: {
    // type: String,
    required: false,
  },
});
export const posts = model("posts", PostSchema);
