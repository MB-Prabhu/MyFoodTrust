const express = require('express');

const {addTrusts, loginTrusts, logoutTrusts, getUsers, getRegisteredFoods, acceptFoodOrder, searchUser, getTrustProfile} = require('../Controllers/Trust.controller');
const { trustUserAuth } = require('../Authentication/TrustUserAuth');
const upload = require('../utils/multer');

let route = express.Router();

route.post("/addtrust",upload.single('image'), addTrusts);
route.post("/logintrust",loginTrusts);
route.post("/logouttrust",logoutTrusts);
route.get('/getusers/:page/:limit', trustUserAuth, getUsers)

route.get('/getfoodorder', trustUserAuth ,getRegisteredFoods)
route.post('/acceptfoodorder/:orderId', trustUserAuth ,acceptFoodOrder)

route.get('/searchuser', trustUserAuth, searchUser)
route.get('/gettrustprofile', trustUserAuth, getTrustProfile)

module.exports=route;