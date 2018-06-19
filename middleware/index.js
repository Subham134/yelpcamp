var objmiddleware={};
var camping = require("../models/camp");
var Comment= require("../models/comment");

objmiddleware.checkOwnership  =    function(req,res,next){
    if(req.isAuthenticated()){
          camping.findById(req.params.id,function(err,camp){
           if(camp.author.id.equals(req.user._id)){
               next();
            }else{
               req.flash("error","you don't  have the permission to do that");

                res.redirect("back");
            }
          });
    }else{
        req.flash("error","you shoul be logged in");
        res.redirect("back");
    }
}



objmiddleware.commentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
          Comment.findById(req.params.x,function(err,comment){
           if(comment.author.id.equals(req.user._id)){
               next();
            }else{
               req.flash("error","you don't  have the permission to do that");

                res.redirect("back");
            }
          });
    }else{
        req.flash("error","you should be logged in first");

        res.redirect("back");
    }
    
}
objmiddleware.isLoggedIn=function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error","you need to Login First!!!");
     res.redirect("/login");
    }
}

    

module.exports=objmiddleware;