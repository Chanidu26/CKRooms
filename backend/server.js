const express = require('express')
const cors = require('cors')
const roomsRoute = require("./routes/roomsRoute");
const usersRoute = require("./routes/usersRoute");
const bookingRoute = require("./routes/bookingRoute");
require('dotenv').config(); 

const app = express()


app.use(express.json())
app.use(cors())
const dbConfig = require("./db");

app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);
app.use("/api/bookings", bookingRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})