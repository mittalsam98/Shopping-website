const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found in DB"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser=(req,res)=>{
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        {$set:req.body},
        { new: true, useFindAndModify: false },
        (err,user)=>{
            if (err || !user) {
                return res.status(400).json({
                  error: "No user was found in DB"
                });
              }
              res.json(user) 
        }

    )
}

