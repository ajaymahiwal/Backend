
const User = require("../Models/user.js");

module.exports.renderSignUp = (req, res) => {
    res.render("./user/signup.ejs");
}

module.exports.signUp = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        const newUser = new User({ email, username });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            console.log(registeredUser);
            req.flash("success", "Welcome To WanderLust");
            res.redirect("/listings");
        });

    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
} 


module.exports.renderLogin =  (req, res) => {
    res.render("./user/login.ejs");
}


module.exports.login = async(req, res) => {
    req.flash("success","Welcome To WanderLust! You are logged in !");
    res.redirect(res.locals.redirectUrl);
}


module.exports.logout = (req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }

        req.flash("success","You Are Logged Out!");
        res.redirect("/listings");
    });
}