const jwt = require('jsonwebtoken')
const TrustModel = require('../models/Trust.model')


const trustUserAuth = async (req, res, next)=>{
try{
        const {authToken} = req.cookies
        // console.log(authToken)
        if(!authToken){
            throw new Error("invalid User please login")
        }
       let decodedData = jwt.verify(authToken, process.env.JWT_SECREAT_KEY)
        
        if(decodedData){
            // console.log(decodedData)
           let user = await TrustModel.findOne({_id: decodedData._id})

            if(!user){
                throw new Error("Trust not found")
            }

           req.user  = user
            next()
        }
        
    }
    catch(err){
        res.status(500).json({msg: err.msg})
    }
}



module.exports = {trustUserAuth}


