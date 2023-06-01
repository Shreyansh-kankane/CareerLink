const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURI = process.env.MONGO_URI;

mongoose.set('strictQuery', false)
const connectToMongo = ()=>{
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected to db succesfully");
    }).catch((err)=>{
        console.log({error: err.message});
    });
}

module.exports = connectToMongo;
