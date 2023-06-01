const {verify} = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken=(req,res,next)=>{
    //get the user from the jwt token and add id to req object
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate a valid token"})
    }
    try {
        const data=verify(token,JWT_SECRET);
        req.user=data;
        next();
    } catch (err) {
        res.status(401).send({error: err.message})
    }  
};
module.exports =  verifyToken;