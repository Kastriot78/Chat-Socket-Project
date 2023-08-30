const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
    notifications: [{
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        count: {
            type: Number,
            default: 0,
        },
    }],
});

module.exports = mongoose.model('user', userSchema);