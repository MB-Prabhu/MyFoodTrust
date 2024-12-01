const express = require('express')
const { userRegistration,userLogin, userLogout, getTrusts,foodRegister, searchTrust ,getUserProfile, getNotification, getNoOfTrusts} = require('../Controllers/User.controller')
const { userAuth } = require('../Authentication/UserAuth')
const upload = require('../utils/multer')

let userRoute = express.Router()

// in postman the key name should be "image" when sendning the file 
userRoute.post('/registeruser',upload.single('profile'),userRegistration)
userRoute.post('/loginuser', userLogin)
userRoute.post('/logoutuser', userLogout)
userRoute.get("/gettrust/:page/:limit",userAuth, getTrusts);
userRoute.post('/foodRegister', userAuth, foodRegister)
userRoute.get('/searchtrust', userAuth, searchTrust)
userRoute.get('/getuserprofile', userAuth, getUserProfile)
userRoute.get('/getnotification', userAuth, getNotification)
userRoute.get('/getnooftrust', userAuth, getNoOfTrusts)
module.exports = userRoute