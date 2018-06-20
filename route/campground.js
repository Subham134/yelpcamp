  var express = require("express");
  var router  = express.Router();
  var camping = require("../models/camp");
  var Comment = require("../models/comment");
  var mid = require("../middleware");
  router.get("/",function(req,res){
    camping.find({},function(err,camp){
    if(err){
        console.log("fasdn");
    }else{
        res.render("campgrounds/camping" , {camp: camp}); 
    }
    });    
    
    });
    router.post("/",mid.isLoggedIn,function(req,res){
        var name = req.body.name;
        var url = req.body.url;
        var price = req.body.price;
        var description = req.body.description;
        var author ={ id:req.user.id,
                      username:req.user.username
                      };
        var obj = {name: name,image: url,description:description,author:author,price:price};
       camping.create(obj,function(err,camp){
             if(err){
                 console.log("  something went wrong!!!!!")
             }
             else{
                res.redirect("/");

             }
       });
    
    });
    router.get("/new",mid.isLoggedIn,function(req,res){
       res.render("campgrounds/new"); 
    });
    router.get("/:id",function(req,res){
        camping.findById(req.params.id).populate("comments").exec(function(err,b){
           if(err){
               console.log("SOMETHING WENT WRONG");
               console.log(err);
           }else{
               console.log(b);
                res.render("campgrounds/show",{camping : b});
               
           } 
           
        });
    });
    router.delete("/:id",mid.checkOwnership,function(req,res){
        camping.findByIdAndRemove(req.params.id,function(err,d){
            if(err){
                res.redirect("/");
            }else{
                res.redirect("/");
                req.flash("error","You Have Deleted the Campground Successfully");
            }
        }) ;
     });
     router.put("/:id",mid.checkOwnership,function(req,res){
        camping.findByIdAndUpdate(req.params.id,req.body.hotel,function(err,newupdated){
           if(err){
               res.redirect("/");
           } 
           else{
               res.redirect("/campsites/" + req.params.id);
               req.flash("sucess","Updated Successfully")
           }
        });
     });
     router.get("/:id/edit",mid.checkOwnership,function(req,res){
        camping.findById(req.params.id,function(err,updated){
           if(err){
               res.redirect("/campsites")
           } 
           else{
               res.render("campgrounds/edit",{hotel: updated});
           }
        });
     });


    

    
    module.exports=router;
    