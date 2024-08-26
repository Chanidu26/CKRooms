const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required: true
    },

    lastName : {
        type: String,
        required: true
    },

    userName : {
        type: String,
        required: true
    },

    email : {
        type: String,
        required: true
    },

    password : {
        type: String,
        required: true
    },

    isAdmin : {
        type: Boolean,
        default: false
    },
},{
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;