const express = require("express");
const { createJob, allJobs,deleteJob } = require("../controllers/jobs");
const verifyToken  = require("../middleware/verifyToken");

const router = express.Router();

router.post("/createJob",verifyToken,createJob);

/* READ */
router.get("/", verifyToken, allJobs);
// router.get("/:userId/posts", verifyToken, getUserPosts);
router.delete("/:id/delete",verifyToken,deleteJob);

/* UPDATE */
// router.patch("/:postId/like", verifyToken, likePost);

module.exports = router;