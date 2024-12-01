const { adminLogin,
    adminLogout,
     getUsersAdmin,
    getTrustsAdmin,
    getTransactions,
    searchUser,
    searchTrust,
    deleteUsersAndTrusts, 
    getNoOfUsers,
    getNoOfTrusts,
    getNoOfTransactions} = require("../Controllers/Admin.controller")

const express = require('express')
const {adminAuth} = require('../Authentication/AdminAuth')
let adminRoute = express.Router()

adminRoute.post('/adminlogin', adminLogin)
adminRoute.post('/adminlogout', adminLogout)
adminRoute.get('/getusers/:page/:limit', adminAuth ,getUsersAdmin)
adminRoute.get('/gettrusts/:page/:limit', adminAuth , getTrustsAdmin)
adminRoute.get('/transactions/:page/:limit', adminAuth ,getTransactions)
adminRoute.get('/searchuser', adminAuth, searchUser)
adminRoute.get('/searchtrust', adminAuth, searchTrust)
adminRoute.get('/getnooftrusts', adminAuth, getNoOfTrusts)
adminRoute.get('/getnoofusers', adminAuth, getNoOfUsers)
adminRoute.get('/getnooftransactions', adminAuth, getNoOfTransactions)
adminRoute.delete('/delete/:role/:id', adminAuth ,deleteUsersAndTrusts)

module.exports = adminRoute