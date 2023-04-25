import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    requried: true,
  },
  content: {
    type: String,
    requried: true,
  },
  likes: {
    type: Map,
    of: Boolean,
  },
  comments: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = mongoose.model("post", PostSchema);
export default PostModel;
