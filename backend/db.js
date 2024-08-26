require('dotenv').config()
const { default: mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

const mongoURL = process.env.MONGODB_URI

mongoose.connect(process.env.MONGODB_URI || mongoURL)

var connection = mongoose.connection

connection.on('error', ()=> {
    console.log('MongDB Connection Failed')
})

connection.on('connected' , ()=>{
    console.log('MongoDB Connection Successful')
})

module.exports  = mongoose