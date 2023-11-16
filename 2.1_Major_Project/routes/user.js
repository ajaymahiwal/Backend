const express = require("express");
const router = express.Router();
// const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const User = require("../Models/user.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./user/signup.ejs");
});
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.flash("success", "Welcome To WanderLust");
        res.redirect("/listings");
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));


router.get("/login", (req, res) => {
    res.render("./user/login.ejs");
});
router.post("/login", passport.authenticate("local",{failureRedirect: "/login",failureFlash: true,}) ,async(req, res) => {
    req.flash("success","Welcome To WanderLust! You are logged in !");
    res.redirect("/listings");
});


module.exports = router;







module.exports = router;