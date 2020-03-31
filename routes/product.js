const express =require('express');
const router=express.Router();

const{
    getProductByID,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
}=require('../controllers/product')

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param('userId',getUserById);
router.param('productId',getProductByID);


router.post('/product/create/:userId',isSignedIn,isAuthenticated,isAdmin,createProduct)


// read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);


//update route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing route

module.exports=router