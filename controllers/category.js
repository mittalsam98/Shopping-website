const Category=require('../models/category');
// const User=require('../models/user');

exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err, cate) => {
        if (err) {
          return res.status(400).json({
            error: "Category not found in DB"
          });
        }
        req.category = cate;
        next();
      });
};

exports.createCategory=(req,res)=>{
    const category=new Category(req.body);
    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "NOT able to save category in DB"
              });
        }
        res.json({category})
    })
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err, categories) => {
        if (err) {
          return res.status(400).json({
            error: "NO categories found"
          });
        }
        res.json(categories);
      });
}

exports.updateCategory=(req,res)=>{
    const category=req.category;
    category.name=req.body.name;

      // Category.findByIdAndUpdate(
    //     { _id:req.category._id },
    //     { name: req.body.name },
    //     { new: true, useFindAndModify: false },
    //     (err, user) => {
    //       if (err) {
    //           console.log(req.category._id )
    //         return res.status(400).json({
    //             err:err,
    //           error: "You are not authorized to update this user"
    //         });
    //       }
    //       res.json(user)
    //     }
    // )
    
    category.save((err, updatedCategory) => {
        if (err) {
          return res.status(400).json({
            error: "Failed to update category"
          });
        }
        res.json(updatedCategory);
      });
}

exports.removeCategory=(req, res) => {
    const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
}