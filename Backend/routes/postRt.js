const express = require("express");
const { createPost, getFeedPosts, getUserPosts, likePost,deletePost } = require("../controllers/post");
const verifyToken  = require("../middleware/verifyToken");

const router = express.Router();

router.post("/createPost",verifyToken,createPost);

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:postId/like", verifyToken, likePost);

router.delete("/:postId/delete",verifyToken,deletePost)

module.exports = router;