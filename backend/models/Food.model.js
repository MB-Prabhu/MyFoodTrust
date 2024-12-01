const mongoose = require('mongoose')

let FoodSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserModel"
    },
    noOfPeople:{
        type: Number,
        required: true,
        min: [1, "atleast it should be afford to one person"]
    },
    address:{
        type: String,
    },
    veg: {
        required: true,
        type: Boolean
    },
    preferred:{
        
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Trust",
            validate: {
                validator: function(val){
                    return val.length<=4
                }, 
            message: "select four or under 4 trusts"
        }
    },
    acceptedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trust",
        default: null
    },
    acceptedTrustName:{
        type: String,
        default: null
    },
    acceptedTrustPhoneNumber:{
        default: null,
        type: String
    },
    senderName:{
        default: null,
        type: String
    },
    senderPhoneNumber:{
        default: null,
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("FoodModel", FoodSchema)