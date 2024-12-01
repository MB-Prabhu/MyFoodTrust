let mongoose= require("mongoose")
let Trustschema= new mongoose.Schema({
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        type: String,
    },
    email:{
        required:true,
        type: String, 
        unique: true
    },
    phone:{
        required:true,
        type: String,
        minlength:  [10, "should be atleast 10 digits long"],
        maxLength: [10, "maximum only 10 digits should be entered"],
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
        minlength: [8, "should be atleast 8 characters long"],
    },
    trustName:{
        type: String,
        required:true,
    },
    trustId:{
        // required:true,
        // unique: true,
        type: String
    },
    trustEmail: {
        unique:true,
        required:true,
        type:String
    },
    address: {
        required: true,
        type: String
    },
    trustPhoneNumber:{
        unique:true,
        required: true,
        type: String
    },
    role: {
        type: String,
        default: "trust"       
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
},{
    timestamps: true,
    minimize: true
})

Trustschema.indexes({trustEmail: 1})

module.exports= mongoose.model("Trust",Trustschema);