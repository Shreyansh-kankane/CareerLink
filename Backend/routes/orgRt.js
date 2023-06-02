const express= require("express");
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();
const {getOrg} = require("../controllers/org");

router.get('/getOrg',verifyToken,getOrg);

module.exports = router;

