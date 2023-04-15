const mongoose = require('mongoose');


const ChatPostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likes: Number
})


const ChatPost = mongoose.model('chat_posts', ChatPostSchema);

module.exports = ChatPost;