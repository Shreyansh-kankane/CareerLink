const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const dotenv = require('dotenv');
dotenv.config();

const signUp = async (req,res)=>{

    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        if (!(email && password && firstName)) {
            res.status(400).send("All input is required");
            return;
        }
        let oldUser = await User.findOne({email: email});
        if(oldUser){
            return res.status(409).json({error: "Sorry a user with this email already exist"});
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password,salt);

        const user = User.create({
            firstName,
            lastName,
            email,
            password: secPass,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const data = {
            userId: user._id,
            email: email
        }

        const authToken=jwt.sign(
            data,
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );
        user.token = authToken;
        res.status(201).json({user});
        return;
    }
    catch(err){
        console.log(err);
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
            return;
        }
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
        const data = {
            userId: user._id,
            email: email
        }
        //Create token
            const token = jwt.sign(
                data,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json({user,token});
            return;
        }
        
        res.status(400).send("Invalid Credentials");
        return;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {signUp,login}

// { user_id: user._id,email},