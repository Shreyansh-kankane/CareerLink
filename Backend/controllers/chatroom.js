const Chatroom = require('../models/Chatroom');
const createChatroom = async(req,res)=>{
    try{
        const {name} = req.body;

        const nameRegex = /^[A-Za-z0-9-_\s]+$/;

        if(!nameRegex.test(name)) throw "Chatroom name can only contain alphabets"

        const chatroom = new Chatroom({
            name,
        });

        console.log(name);

        let chatroomExists = await Chatroom.findOne({name:name});
        if(chatroomExists){
            return res.status(409).json({error: "Sorry a chatroom with this name already exist"});
        }
        await chatroom.save();
        res.status(201).json({mess: "chatroom created successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err.message});
    }  
}

const allChatRoom = async (req,res)=>{

    try{
        const chatRooms =  await Chatroom.find();
        res.status(200).json({chatRooms});
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}

module.exports = {createChatroom,allChatRoom}