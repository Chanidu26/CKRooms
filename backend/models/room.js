const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({

    name : {
        type: String,
        required: true
    },

    maxCount : {
        type: Number,
        required: true
    },

    phoneNo : {
        type: String,
        required: true
    },

    pricePerDay : {
        type: Number,
        required: true
    },

    roomType : {
        type: String,
        required: true
    },

    description : {
        type: String,
        required: true
    },

    imgURL : [],
    bookedDates : [],

},{
    timestamps: true
});

const roomModel = mongoose.model('rooms', roomSchema);
module.exports = roomModel;