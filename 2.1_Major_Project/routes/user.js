const express = require("express");
const router = express.Router();
// const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../Models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewares/middleW.js");


const userController = require("../controllers/users.js");


router
    .route("/signup")
    .get(userController.renderSignUp)
    .post(wrapAsync(userController.signUp))



router
    .route("/login")
    .get(userController.renderLogin)
    .post(
    saveRedirectUrl, 
    passport.authenticate("local",{failureRedirect: "/login",failureFlash: true}),userController.login)



router.get("/logout",userController.logout);




module.exports = router;
