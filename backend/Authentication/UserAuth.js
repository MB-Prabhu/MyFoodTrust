const UserModel = require("../models/User.model");
const jwt  = require("jsonwebtoken");

const userAuth = async (req, res, next)=>{
    try{
    const {userlogintoken} = req.cookies
    if(!userlogintoken){
        throw new Error("user is not loggedin")
    }
    let decodedData = await jwt.verify(userlogintoken, process.env.JWT_USER_SECREAT_KEY)
    
    if(decodedData){
        let user = await UserModel.findOne({_id: decodedData._id})

        if(!user){
            throw new Error("User not found")
        }
        req.user = user
        // console.log("auth working properly in user")
        next()
    }
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}


module.exports = {
    userAuth
}