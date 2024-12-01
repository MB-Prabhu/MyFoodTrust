const express = require("express")
const UserModel = require('../models/User.model')
const bcrypt = require('bcrypt')
const { validateUser } = require('../Validation/ValidationUser')
const jwt = require('jsonwebtoken')
const Trust = require("../models/Trust.model")
const FoodModel = require("../models/Food.model")

const cloudinary = require("../CloudinaryConfig.js/cluoudinaryconfig")
const fs = require('fs')
const TrustModel = require("../models/Trust.model")

let userRegistration = async(req, res)=>{

    try{

            await validateUser(req)
            let {Name,email, phone, password, confirmPassword, address} = req.body

        //    if(req.file){
            // const result = await cloudinary.uploader.upload(req.file.path, {
            //     folder: "UserProfile", // Subfolder for user profile images
            //   });

            // fs.unlink(req.file.path, (err) => {
            //     if (err) {
            //         console.error("Error deleting file:", err);
            //     }
            // });
        //    }
            let hashedPassword = await bcrypt.hash(password,10)

            // for cluster if youre using cluster
            // console.log(req.file)
            let imageData = {};
            if (req.file && req.file.buffer) {
                    console.log("file detected")
              // Upload image using Cloudinary's upload_stream
              const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                  {
                    folder: 'UserProfile', // Folder in Cloudinary
                  },
                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                  }
                );
        
            //     // Pipe the file buffer to Cloudinary's stream
                stream.end(req.file.buffer);
              });
        
              const result = await uploadPromise;
              console.log("uploading imge")
              imageData = {
                public_id: result.public_id,
                url: result.secure_url,
              };
            }

            console.log(imageData)

            let newUser = new UserModel({
                Name, 
                email,
                phone, 
                address,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                // image:{
                //     public_id: result.public_id,
                //     url: result.secure_url
                // },
                // for cluster usage
                image: imageData
            })

            await newUser.save()
            res.status(200).json({msg: "User Registered SuccessFully", data: newUser})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let userLogin = async (req, res)=>{
    try{
        
        let {Name,email, phone, password, confirmPassword } = req.body
        let {userlogintoken} = req.cookies

        if(userlogintoken){
            let decodedData = jwt.verify(userlogintoken, process.env.JWT_USER_SECREAT_KEY)
            if(decodedData){
                throw new Error("user is already loggedin")
            }
        }

        if(!email){
            throw new Error("Enter the Email")
          }

          if(!password){
            throw new Error("Enter Password")
          }

         let isExists = await UserModel.findOne({email: email})

         if(!isExists){
            throw new Error("User is not a registered")
         }

        let isMatching = await bcrypt.compare(password, isExists.password)

        if(!isMatching){
            throw new Error("password is not matching")
        }

         let token = await jwt.sign({_id: isExists._id,  role: 'user'}, process.env.JWT_USER_SECREAT_KEY, {expiresIn: process.env.JWT_USER_TOKEN_EXPIRY})
         res.cookie("userlogintoken", token, {expires: new Date(Date.now() + 20 * 500000)})
         res.status(200).json({msg: isExists.Name + " has loggedin", token: token , success: true})
    }
    catch(err){
        res.status(500).json({error:true,message:err.message})
    }
}

let userLogout = async (req, res)=>{
    res.cookie("userlogintoken", null, {expires: new Date(Date.now())})
    res.status(200).json({msg: "user has logged out"})
}

let getTrusts=async(req,res,next)=>{
    // console.log("working")
    let limit = (req.params.limit > 20 ? 10 : req.params.limit) || 10
    let page = req.params.page || 1
    let skip = (page-1) * limit
    let allowedFields = ["trustName", "trustEmail", "trustPhoneNumber", "address", "image"]
    try{
        let trusts =await Trust.find({}).select(allowedFields).skip(skip).limit(limit)
        res.status(201).json({error:false,message:"Trust Fetch succesfully",data:trusts})
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}


let foodRegister = async (req, res)=>{
    try{
        let user = req.user
        let {fromUserId, noOfPeople, veg, preferred, acceptedBy} = req.body
            // console.log(user)
            console.log(noOfPeople)
            console.log("type of noOfpeople",typeof noOfPeople)
        if(!noOfPeople){
            throw new Error("Atleast it should be afford to one person")
        }

        if(preferred.length>4){
            throw new Error("select four or under 4 trusts")
        }
        
        let data = await FoodModel.create({fromUserId, noOfPeople, veg, preferred, address: user.address, acceptedBy})
        data.senderName = user.Name
        data.senderPhoneNumber = user.phone
        await data.save()
        res.status(201).json({msg: "food created", data})
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}

let searchTrust = async (req, res)=>{
    try{
    let allowedFields = ["trustName", "trustEmail", "trustPhoneNumber", "address", "image", "role"]
        let search = req.query.search
        let page = req.query.page || 1
        let limit = req.query.limit || 10
        let skip = (page-1) * limit
    
        let totalDocuments = await UserModel.countDocuments();
        // console.log(totalDocuments)

        let totalPages = Math.ceil(totalDocuments / limit);

        if (page > totalPages) {
            throw new Error(`Not enough data available. Total pages: ${totalPages}`);
        }

        const regex = new RegExp(search, "i"); // 'i' makes it case-insensitive

        // Find documents where the `name` field matches the regex
        const data = await TrustModel.find({ trustName: { $regex: regex } }).skip(skip).limit(limit).select(allowedFields)
       
        // let data = await TrustModel.find({trustName: {$regex: search, $options: "i"}}).skip(skip).limit(limit)
    
        if(!data.length>0){
            throw new Error("No Trusts Available")
        }

       res.status(200).json({msg: "Trust fetched successfully", data})
       }
       catch(err){
        res.status(500).json({error:true,message:err.message})
       }
}

let getUserProfile = async (req, res)=>{
    try{
        let user = req.user
        let encodedUser = {}
        let allowedField = ["_id", "Name", "email", "phone", "image", "address","createdAt", "updatedAt"]

        for(let keys of allowedField){
            encodedUser[keys] = user[keys]
        }

        res.status(200).json({msg: "Data has Fetched", data: encodedUser})
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}

let getNotification = async (req, res)=>{
    try{
        let user = req.user
        let foodOrdersAccepted = await FoodModel.find({fromUserId: user._id, acceptedBy: {$ne: null}}).select("acceptedBy acceptedTrustName acceptedTrustPhoneNumber veg noOfPeople")
        res.status(200).json({msg: "accepted orders data fetched", data: foodOrdersAccepted})
    }
    catch(err){
        res.status(500).json({error:true, message:err.message})
    }
}

let getNoOfTrusts = async (req, res)=>{
    let data = await TrustModel.countDocuments()
    res.status(200).json({msg: "Total number of Trusts fethed", data})
}


module.exports= {
    userRegistration,
    userLogin,
    userLogout,
    getTrusts,
    foodRegister,
    searchTrust,
    getUserProfile,
    getNotification,
    getNoOfTrusts
}