const express = require('express');
const mongoose = require('mongoose');
let app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require("cors")

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(cookieParser())

const trustRoutes = require('./Routes/TrustRoutes');
const userRoute = require('./Routes/UserRoutes');
const adminRoute = require('./Routes/AdminRoutes');
const connectDb  = require('./Database/ConnectDB');

const fs = require("fs")
const path = require("path")

app.use(express.json())

const uploadsDir = path.join(__dirname, 'uploads');

// Check if the folder exists, and create it if it doesn't
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use("/api/trust",trustRoutes )
app.use('/api/user', userRoute)
app.use('/api/admin', adminRoute)


app.use((err, req, res, next) => {
    console.error("Unhandled error:", err); // Log unhandled errors
    res.status(500).json({ error: true, message: "An unexpected error occurred: " + err.message, success: false });
  });
  
// mongoose.connect('mongodb://127.0.0.1:27017/Trust').then((data) => {
//     console.log("Mongodb Connected Succesfully")
// }).catch((err) => {
//     console.log(err)
// })
let PORT = process.env.PORT || 5000;
connectDb().then(()=>{
    console.log("DB connected successfully")

// should keep inside this inside "then" block
app.listen(PORT, () => {
    console.log(`Server running in the ${PORT}`)
})
}).catch(err=> console.log(err.message))