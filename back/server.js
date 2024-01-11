require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const morgan = require('morgan')
const session = require('express-session')
const cors = require('cors')
const corsOption = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const orgRoutes = require('./routes/orgRoutes')
const courseRoutes = require('./routes/courseRoutes')
const volunteerRoutes = require("./routes/volunteerRoutes")
const scheduleRoutes = require("./routes/scheduleRoutes")
const PORT = 3500
connectDB();

//mount middle ware
//static files
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(morgan("tiny"));

//configure session settings
app.use(
  session({
    secret: "ajfeirf90aeu9eroejfoefj",
    resave: false,
    saveUninitialized: false,
  })
);

//routes 
//must mount route in server file, impoted at top
app.use("/schedule", scheduleRoutes)
//must mount route in server file
app.use("/volunteer", volunteerRoutes)
app.use('/organization', orgRoutes)
app.use('/course', courseRoutes)
mongoose.connection.once('open', ()=>{
  console.log('Connected to MongoDB')
  app.listen(PORT, () => console.log('Server is running on port '+PORT))
})

mongoose.connection.on('error', err => {
  console.log(err)
  logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
}) 