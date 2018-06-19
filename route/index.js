var express = require("express");
var router  = express.Router({mergeParams:true});
var camping = require("../models/camp");
var Comment = require("../models/comment");
var mid = require("../middleware");
 router.get("/new",mid.isLoggedIn,function(req,res){
    camping.findById(req.params.id,function(err,camp){
       if(err){
           res.redirect("/campsites");
       } 
       else{
           res.render("./comment/comment",{camp:camp});
       }
    });
 });
 router.post("/",function(req,res){
    camping.findById(req.params.id,function(err,camp){
       if(err){
           res.redirect("/campsites");
       } 
       else{
           Comment.create(req.body.comment,function(err,comment){
                 if(err){
                     console.log("ksflkndsklvndnv");
                 }else{
                     comment.author.id=req.user._id;
                     comment.author.username=req.user.username;
                     comment.save();
                     camp.comments.push(comment);
                     camp.save();
                     console.log(comment);
                     res.redirect("/campsites/"+camp._id);
                 }
           });
       }
    });
 });
router.get("/:commentid/edit",function(req,res){
    Comment.findById(req.params.commentid,function(err,comment){
    if(err){
        res.redirect(err);
    }else{
            
res.render("./comment/edit",{campid: req.params.id,c: comment});
    }
    });
});
   
router.put("/:x",mid.commentOwnership,function(req,res){
   Comment.findByIdAndUpdate(req.params.x,req.body.comment,function(err,comment){
    if(err){
        console.log("subham agrawal");
    }else{
        res.redirect("/campsites/" +req.params.id);   
    }
   });
});
 
router.delete("/:x",mid.commentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.x,function(err,comment){
     if(err){
         console.log("subham agrawal");
     }else{
         res.redirect("/campsites/" +req.params.id);   
     }
    });
 });


module.exports = router;