var express                = require("express"),
    app                    = express(),
    bodyParser             = require("body-parser"),
    mongoose               = require("mongoose"), 
    x                      = require("./seed");
    passport               = require("passport"),
    LocalStrategy          = require("passport-local"),
   
    camping                = require("./models/camp"),
    Comment                = require("./models/comment"),
    User                   = require("./models/user"),
    x                      = require("./seed"),
    flash                  = require("connect-flash");

    mongoose.connect("mongodb://localhost/camp");
app.use(express.static(__dirname+"/public"));
methodOverride        = require("method-override");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
// x();
app.use(flash());
app.use(require("express-session")({
    secret: "jarvis is the goal",
    resave: false,
    saveUninitialized: false    
}));

app.use(passport.initialize());
app.use(passport.session());
 passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  passport.use(new LocalStrategy(User.authenticate()));
app.use(function(req,res,next){
        res.locals.cUser=req.user;
        res.locals.error=req.flash("error");
        res.locals.sucess=req.flash("sucess");
    
        next();
    });

    var campRoutes = require("./route/campground");
    app.use("/campsites",campRoutes);

    var authRoutes = require("./route/auth");
    app.use(authRoutes);

    var commentRoutes = require("./route/index");
    app.use("/campsites/:id/comments",commentRoutes);

app.listen(8000,function(){
    console.log("yelpcamp started");
    
});