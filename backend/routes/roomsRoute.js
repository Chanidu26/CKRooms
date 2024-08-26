const express = require('express');
const router = express.Router();

const roomModel = require('../models/room')

router.get('/getAllRooms',async (req,res)=>{
    try{
        const rooms = await roomModel.find();
        res.send(rooms);
    }catch(error){
        return res.status(400).json({massage: error});
    }
});

router.post('/getRoomById',async (req,res)=>{

    const roomId = req.body.RoomId;
    try{
        const room = await roomModel.findOne({_id : roomId})
        res.send(room);
    }catch(error){
        return res.status(400).json({message: error});
    }
});

router.get('/deleteRoom/:id',async (req,res)=>{

    const roomId = req.params.id;
    console.log(roomId);

    try{
        const room = await roomModel.findByIdAndDelete(req.params.id);
        res.send('room deleted');
    }catch(error){
        return res.status(400).json({message: error});
    }

});

router.post('/addRoom',async (req,res)=>{
    const room = req.body;
    try{
        const newRoom = new roomModel(room);
        const response = await newRoom.save();
        res.send(response);
    }catch(error){
        return res.status(400).json({message: error});
    }
});

module.exports = router;

