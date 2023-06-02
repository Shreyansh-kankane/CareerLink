const mongoose = require("mongoose");
const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},
{timestamps: true}
);

const chatroom = mongoose.model("Chatroom", chatroomSchema);
module.exports = chatroom;
