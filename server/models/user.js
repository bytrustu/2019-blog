const mongoose = require('mongoose');
const moment = require('moment');

// Create Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["MainJuin", "SubJuin", "User"],
        default: "User",
    },
    register_date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    comments: [
        {
            post_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "post"
            },
            comment_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comments"
            }
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ]
});

const User = mongoose.model("user", UserSchema);
module.exports = User;