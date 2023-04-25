import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, userName, email, title, content } = req.body;

    const newPost = new Post({
      userId,
      userName,
      email,
      title,
      content,
      likes: {},
      comments: {},
    });
    await newPost.save();
    const allPost = await Post.find();
    res.status(200).json(allPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const myPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ userId: id }).sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const friendsPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const posts = await Promise.all(
      user.friends.map((id) => Post.find({ userId: id }))
    );

    const modifiedPosts = [];
    posts.map((manyPosts) => manyPosts.map((post) => modifiedPosts.push(post)));

    res.status(200).json(modifiedPosts.sort((a, b) => b.date - a.date));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userName, comment } = req.body;
    const post = await Post.findById(postId);

    post.comments.unshift({ userName, comment });
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).send("Post deleted successfully");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
