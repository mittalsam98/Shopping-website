const express = require("express");
const router = express.Router();

const {getUserById,getUser} = require("../controllers/user")
const { isSigned, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param('userId',getUserById);

router.get("/user/:userI",isSigned,isAuthenticated,getUser)

module.exports=router;