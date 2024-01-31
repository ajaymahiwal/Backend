require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const session = require('express-session')
const User = require("./User.js");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");



const MONGO_URL = 'mongodb://127.0.0.1:27017/loginpractice';
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("connected with db.");
})
.catch((err)=>{
    console.log("Not able to connect with db.");
})

app.use(session({
    secret:"ajayaskdlfa",
    resave:false,
    saveUninitialized:true,
    cookie: {
        secure: false,
        maxAge:7*60*60*24*1000, // 7 days milliseconds
     }
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL:"http://localhost:3000/auth/google/callback",
},

    async function(accessToken,refreshToken,profile,done){
        console.log(profile);
        try{
            let user = await User.findOne({email : profile.emails[0].value});

            if(!user){
                user = new User({
                    email: profile.emails[0].value,
                    username:profile.emails[0].value.replace("@gmail.com",""),
                    name:profile.displayName,
                });

                await user.save();
            }

            return done(null,user);
        }
        catch(err){
            return done(err,null);
        }
    }
))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.user = req.user;
    // console.log(res.locals.user);
    next();
})

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res)=>{
    res.render("home");
})
app.get("/user",(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
},(req,res)=>{
    res.render("user");
})
app.get("/login",
    passport.authenticate('google',{scope:['profile','email']})
)
app.get("/auth/google/callback",
    passport.authenticate('google',{failureRedirect:"/",successRedirect:"/user"})
);






app.get("/logout",(req,res)=>{
    req.logOut((err,done)=>{

    });

    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
})