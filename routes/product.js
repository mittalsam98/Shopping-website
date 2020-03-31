const express =require('express');
const router=express.Router();

const{
    getProductByID
}=require('../controllers/product')

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param('/userId',getUserById)
router.param('/productId',getProductByID)

module.exports=router