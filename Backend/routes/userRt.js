const express=require("express");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
} = require("../controllers/user.js");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:friendId/friend", verifyToken, addRemoveFriend);

module.exports = router;