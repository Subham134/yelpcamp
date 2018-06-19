var express  = require("express");
var router   = express.Router();
var camping  = require("../models/camp");
var Comment  = require("../models/comment");
var User     = require("../models/user");
var passport = require("passport");
router.get("/login",function(req, res) {
    res.render("login");
});
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req, res){
    User.register(new User({username: req.body.username}),req.body.password, function(err, user){
        if(err){
            req.flash("sucess",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campsites");
        });
    });
});                 
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campsites",
    failureRedirect: "/login"
}) ,function(req, res){
});
router.get("/logout", function(req, res){
   
    
    console.log("logged out");

    req.logout();
    req.flash("sucess","You Have Logged Out!!!!!");
    res.redirect("/login");
});





//routes starts here 
router.get("/",function(req,res){
    console.log(req.user);
   res.render("home"); 
});

module.exports  = router;