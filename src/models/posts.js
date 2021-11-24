const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const userPostSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    user:{
        type: ObjectId,
        ref: "User"
    }
})

const Post = mongoose.model("Post", userPostSchema);

module.exports = Post; 