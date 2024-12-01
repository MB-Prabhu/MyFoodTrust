const Trust = require("../models/Trust.model")
const UserModel = require('../models/User.model')

const validateTrust = async (req)=>{
    let {firstName,email, lastName, phone, password, confirmPassword,trustName,
        trustId, address, trustEmail,trustPhoneNumber } = req.body
      if(!email){
        throw new Error("Enter the Email")
      }

      let isExists = await Trust.findOne({$or: [{email: email}, {phone: phone}, {trustEmail: trustEmail}, {trustPhoneNumber: trustPhoneNumber}]})

      if(isExists){
        console.log(isExists)
        console.log("user is already there")
        throw new Error("User Already registered")
      }

      if( phone.length!==10 || trustPhoneNumber.length!==10){
            throw new Error("Mobile Number should be 10 digits long")
        }

      if(password!==confirmPassword){
        throw new Error("Password is not matching with confirm Password")
      }
      console.log("no problem")
}

let validateUser = async (req, res)=>{
  let {Name,email, phone, password, confirmPassword, address } = req.body
  if(!email){
    throw new Error("Enter the Email")
  }
 let isExists = await UserModel.findOne({$or: [{email: email}, {phone: phone}]})

  if(isExists){
    console.log("user is already there")
        throw new Error("User Already registered")
  }

  if( phone.length!==10){
        throw new Error("Mobile Number should be 10 digits long")
    }

    if(!address){
      throw new Error("please enter you address")
    }

  if(password!=confirmPassword){
    throw new Error("Password is not matching with confirm Password")
  }
  console.log("no problem")
}

let validateAdmin = async (req)=>{
  let {email, password} = req.body

  if(!email){
    throw new Error("Enter the Email")
  }

  if(password.length<8){
    throw new Error("Password should be atleast 8 characters long")
  }
}

module.exports= {
    validateTrust,
    validateUser,
    validateAdmin
}