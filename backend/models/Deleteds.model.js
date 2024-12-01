const mongoose = require('mongoose')

let deletedSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Deleteds", deletedSchema)