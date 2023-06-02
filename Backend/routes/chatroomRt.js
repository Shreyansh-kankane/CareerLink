const express= require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const {createChatroom,allChatRoom} = require("../controllers/chatroom");

router.post('/',verifyToken,createChatroom);
router.get('/',verifyToken,allChatRoom);

module.exports = router;

