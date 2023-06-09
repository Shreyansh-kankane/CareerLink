const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectToMongo = require('./db.js');
const authRt = require('./routes/authRt.js');
const postRt = require("./routes/postRt.js");
const userRt = require("./routes/userRt.js");
// const jobRt = require("./models/Jobs.js");
const orgRt = require('./routes/orgRt.js');
const jobRt = require('./routes/jobRt.js');
const chatroomRt = require('./routes/chatroomRt.js');

// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function(req,file,cb){
//         cb(null,path.join(__dirname,'./public/images'));
//     },
//     filename:function(req,file,cb){
//         const name = Date.now()+'-'+file.originalname;
//     }
// });
// const upload = multer({storage:storage});

dotenv.config();

const port = process.env.PORT || 5000;

const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
// app.use(express.static('public'));

app.use('/auth',authRt);
app.use('/post',postRt);
app.use('/user',userRt);
app.use('/org',orgRt);
app.use('/jobs',jobRt);
app.use('/chatroom',chatroomRt);

app.get('/',(req,res)=>{
    res.send("hello world")
});

connectToMongo();

app.listen(port,()=>{
    console.log("Server is running on port:"+ port);
})

