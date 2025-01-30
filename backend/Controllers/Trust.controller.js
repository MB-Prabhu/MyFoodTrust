let Trust=require('../models/Trust.model')
const {validateTrust} = require('../Validation/ValidationUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/User.model')
const TrustModel = require('../models/Trust.model')
const FoodModel = require('../models/Food.model')
const cloudinary = require('../CloudinaryConfig.js/cluoudinaryconfig')

const fs = require('fs')
const { log } = require('console')


let addTrusts=async(req,res)=>{
    try{
        await validateTrust(req)
        let {firstName,email, lastName, phone, password, confirmPassword,trustName,
             trustId, address, trustEmail,trustPhoneNumber}=req.body

        let currentPassword = await bcrypt.hash(password,10)

        let imageData = {}; 
    
    if (req.file && req.file.buffer) {
      
      const uploadPromise = new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "TrustProfile" }, // Upload to Cloudinary's TrustProfile folder
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        // Pipe the file buffer to Cloudinary
        stream.end(req.file.buffer);
      });

      const result = await uploadPromise;
      imageData = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
    


        let newTrust = await Trust.create({
            firstName,
            lastName,
            email,
            phone,
            image: imageData,
            password: currentPassword,
            confirmPassword: currentPassword,
            trustName,
             trustId,
             address,
             trustEmail,
            trustPhoneNumber }) 

        res.status(201).json({error:false,message:"Trust Added Successfully",data:newTrust})
    }
    catch(err){
        res.status(500).json({error:true,message: err.message})
    }
}

let loginTrusts = async (req, res)=>{
    try{
            let {trustEmail, password} = req.body
            const {authToken} = req.cookies
            if(authToken){
                const decodedData = jwt.verify(authToken, process.env.JWT_SECREAT_KEY)
                if(decodedData){
                    throw new Error("user is already logged in")
                }
            }
            let isExist = await Trust.findOne({trustEmail: trustEmail})
            
            if(!isExist){
                throw new Error("Trust is not registered")
            }

            let isMatching = await bcrypt.compare(password, isExist.password)
            if(!isMatching){
                throw new Error("incorrect password")
            }

            let token = await jwt.sign({_id: isExist._id,  role: 'trust'}, process.env.JWT_SECREAT_KEY ,{expiresIn: process.env.JWT_TOKEN_EXPIRY})
        
            res.cookie("authToken", token, {
                expires: new Date(Date.now() + 20 * 500000),
                // httpOnly: true,
                // secure: true,   
                // sameSite: 'None'
            }) //in 40min cookie will expire
            res.status(200).json({msg: isExist.firstName + " login Successfull", token: token, success: true })
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let logoutTrusts = async (req, res)=>{
         res.cookie("authToken", null, {expires: new Date(Date.now())})
         res.status(200).json({msg: "user logged out successfully"})       
}

let getUsers = async (req,res)=>{
let allowedFields = ["Name", "phone", "email", "address", "_id", "image"]

        try{
           
            let limit = (req.params.limit > 20 ? 10 : req.params.limit) || 10
            let page = req.params.page || 1
            let skip = (page-1) * limit

            let data = await UserModel.find({}).skip(skip).limit(limit).select(allowedFields)
            res.status(200).json({msg: "Users data fetched", page, limit, data})
        }
        catch(err){
        res.status(500).json({error:true,message:err.message})
        }
}

let getRegisteredFoods = async (req, res)=>{
    try{
        let user = req.user

        let page = req.query.page || 1
        let limit = (req.query.limit > 20 ? 10 : req.query.limit) || 10
        let skip = (page-1) * limit

        let preferredOrders = await FoodModel.find({preferred: {$in: [user._id]}, acceptedBy: {$eq: null}}).skip(skip).limit(limit).select("fromUserId noOfPeople address veg createdAt preferred senderName senderPhoneNumber acceptedBy acceptedTrustName acceptedTrustPhoneNumber")

        let preferredOrdersSenderId = preferredOrders?.map(order=>{
        return order._id.toString()
        })
        
          let normalOrders = await FoodModel.find({_id: {$nin : preferredOrdersSenderId}, acceptedBy: {$eq: null}}).skip(skip).limit(limit)

         let data = preferredOrders.concat(normalOrders)
         
        res.status(200).json({msg: "data fetched correctly", data}) 
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let acceptFoodOrder = async (req, res)=>{
    try{
        let user = req.user
        let {orderId} = req.params
        let isAvailable = await FoodModel.findById(orderId)
        if(!isAvailable){
            throw new Error("order not found")
        }
        
        if(isAvailable?.acceptedBy){
            throw new Error("already accepted")
        }
        
        isAvailable.acceptedBy = user._id
        isAvailable.acceptedTrustName = user.trustName
        isAvailable.acceptedTrustPhoneNumber = user.trustPhoneNumber
        await isAvailable.save()
        res.status(200).json({msg: user.firstName + " accepted the order", data: isAvailable})

    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let searchUser = async (req, res)=>{
    try{
        let allowedFields = ["Name", "phone", "email", "address", "image", "role"]
        let search = req.query.search

        let limit = req.query.limit > 20 ? 20 : req.query.limit || 10
        let page = req.query.page || 1
        let skip = (page -1)* limit

        let totalDocuments = await UserModel.countDocuments();

        let totalPages = Math.ceil(totalDocuments / limit);

        if (page > totalPages) {
            throw new Error(`Not enough data available. Total pages: ${totalPages}`);
        }
        const regex = new RegExp(search, "i"); // 'i' makes it case-insensitive

        const data = await UserModel.find({ Name: { $regex: regex } }).skip(skip).limit(limit).select(allowedFields)
        
       if(!data.length>0){
        throw new Error("No Users Available")
       }
        res.status(200).json({msg: "Users fetched successfully", data})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let getTrustProfile =  (req, res)=>{
    try{
        let user = req.user
        let encodedUserData = {}
        let allowedField = ["image", "_id", "firstName", "lastName", "email", "phone", "trustName", "address", "trustPhoneNumber", "createdAt", "updatedAt"]

        for(let keys of allowedField){
            encodedUserData[keys] = user[keys]
        }

        res.status(200).json({msg: "Users fetched successfully", user: encodedUserData})

    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}


module.exports={
    addTrusts,
    loginTrusts,
    logoutTrusts,
    getUsers,
    getRegisteredFoods,
    acceptFoodOrder,
    searchUser,
    getTrustProfile
}