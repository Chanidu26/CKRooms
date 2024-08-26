const express = require("express");
const router = express.Router();
const bookingModel = require("../models/booking");
const roomModel = require("../models/room");
require("dotenv").config();
const stripe = require("stripe")(
    process.env.STRIPE_SECRET_KEY
);

const { v4: uuidv4 } = require("uuid");

router.post("/bookRoom", async (req, res) => {
    const booking = new bookingModel(req.body);

    try {
        const response = await booking.save();
        const roomId = req.body.roomId;

        const roomTemp = await roomModel.findOne({ _id: roomId });

        roomTemp.bookedDates.push({
            _id: response._id,
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            userId: req.body.userId,
            isBooked: response.isBooked,
        });

        const room = await roomTemp.save();
        res.send(roomTemp);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/payment", async (req, res) => {
    const token = req.body.token;
    const amount = req.body.amount;
    const description = req.body.description;
    const idempotencyKey = uuidv4();

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });

        const payment = await stripe.charges.create(
            {
                amount: amount * 100,
                currency: "LKR",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${description}`,
            },
            {
                idempotencyKey: idempotencyKey,
            }
        );

        res.send(payment);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getBookingsByUserId", async (req, res) => {
    const userId = req.body.userId;
    try {
        const bookings = await bookingModel.find({ userId: userId });
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/cancelBooking", async (req, res) => {
    const bookingId = req.body.bookingId;
    const roomId = req.body.roomId;

    try {
        const booking = await bookingModel.findOne({ _id: bookingId });
        booking.isBooked = false;
        const response = await booking.save();

        const tempRoom = await roomModel.findOne({ _id: roomId });
        const tempBookedDates = tempRoom.bookedDates.filter(
            (booking) => booking._id != bookingId
        );

        tempRoom.bookedDates = tempBookedDates;
        const room = await tempRoom.save();

        res.send(room);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getAllBookings", async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        res.send(bookings);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;