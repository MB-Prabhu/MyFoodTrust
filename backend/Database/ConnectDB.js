const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING,
            // {
            //     serverSelectionTimeoutMS: 30000 
            // }
        )
        // console.log("database is connected successfully")
    }
    catch(err){
        console.log("ERROR OCCURED: "+err.message)
    }
}

module.exports = connectDb