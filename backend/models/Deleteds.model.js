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

deletedSchema.index({email:1})

module.exports = mongoose.model("Deleteds", deletedSchema)