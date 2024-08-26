const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

router.post("/register", async (req, res) => {
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpassword;
    const user = new userModel(req.body);

    try {
        const response = await user.save();
        if(response){
            const temp = {
                _id: response._id,
                firstName: response.firstName,
                lastName: response.lastName,
                userName: response.userName,
                email: response.email,
                isAdmin: response.isAdmin,
            }
            res.send(temp);
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await userModel.findOne({
            email: email
        });
        if (response && await bcrypt.compare(password, response.password)) {

            const temp = {
                _id: response._id,
                firstName: response.firstName,
                lastName: response.lastName,
                userName: response.userName,
                email: response.email,
                isAdmin: response.isAdmin,
            }

            res.send(temp);
        } else {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.get("/getAllUsers", async (req, res) => {
    try {
        const response = await userModel.find();
        res.send(response);
    }catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;