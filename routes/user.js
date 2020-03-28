const express = require("express");
const router = express.Router();

const {getUserById,getUser,updateUser} = require("../controllers/user")
const { isSigned, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param('userId',getUserById);

router.get("/user/:userId",isSigned,isAuthenticated,getUser)
router.put("/user/:userId", isSigned, isAuthenticated, updateUser);
router.get(
    "/orders/user/:userId",
    isSignedIn,
    isAuthenticated,
    userPurchaseList
  );
module.exports=router;