const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

    roomId : {
        type : String,
        required : true
    },

    userId : {
        type : String,
        required : true
    },

    roomName : {
        type : String,
        required : true
    },

    fromDate : {
        type : Object,
        required : true
    },

    toDate : {
        type : String,
        required : true
    },

    totalAmount : {
        type : Number,
        required : true
    },

    totalDays : {
        type : Number,
        required : true
    },

    transactionId : {
        type : String,
        required : true
    },

    isBooked : {
        type : Boolean,
        default : true
    },
}, {
    timestamps : true
});

const bookingModel = mongoose.model('bookings', bookingSchema);
module.exports = bookingModel;