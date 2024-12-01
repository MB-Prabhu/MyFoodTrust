const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        required:true,
        type: String,
        minlength:  [8, "should be atleast 8 characters long"],
   },
    confirmPassword:{
        required:true,
        type: String,
        minlength:  [8, "should be atleast 8 characters long"],
   },
    phone:{
        required:true,
        type: String,
        minlength:  [10, "should be atleast 10 digits long"],
        maxLength: [10, "maximum only 10 digits should be entered"],
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"       
    },
    image:{
        public_id: {
                type: String,
                default: null
        },
        url: {
            type: String,
            default: "N/A"
        }
    }
})

userSchema.indexes({email: 1})

module.exports = mongoose.model("UserModel", userSchema )