const Post = require('../models/Posts');
const User = require("../models/Users");

/* CREATE */
const createPost = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  const userId = req.user.userId;
  const postId= req.params.postId;
  try {
      let post = await Post.findById(postId);

      if (!post) { return res.status(404).send("Not Found") }

      if (post.userId.toString() !== userId) {
        return res.status(401).send("Not Allowed");
      }
      post = await Post.findByIdAndDelete(postId);
      res.json({Succes:"post has been deleted"});
  }
  catch (error) {
      console.error(error.message);
      res.status(500).json().send("some internal server error occured");
  }
}

/* READ */
const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

/* UPDATE */
const likePost = async (req, res) => {
  try {
    const userId  = req.user.userId;
    const { postId } = req.params;

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
    res.status(404).json({ message: err.message });
  }
};

module.exports = {createPost,getFeedPosts,getUserPosts,likePost,deletePost}