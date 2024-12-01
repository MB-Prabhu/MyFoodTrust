const jwt = require('jsonwebtoken')
let AdminModel = require( '../models/Admin.modle');

let adminAuth = async (req, res, next)=>{
    try{
        let {admintoken} = req.cookies
        if(!admintoken){
           throw new Error("admin is not loggedIn")
        }

        let {_id} = await jwt.verify(admintoken, process.env.JWT_ADMIN_SECREAT_KEY)
        
        if(_id){
           let isAdminExists = await AdminModel.findOne({_id: _id})

           if(!isAdminExists){
            throw new Error("admin not found")
           }     
            req.admin = isAdminExists
            next()         
        }
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

module.exports = {
    adminAuth
}