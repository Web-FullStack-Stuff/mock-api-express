import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", PostSchema);

export default Post;