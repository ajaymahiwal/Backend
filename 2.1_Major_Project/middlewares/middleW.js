
const Listing = require("../Models/listing.js");

module.exports.isLoggedIn = (req, res, next)=>{
    console.log("Current Session User Data:",req.user);

    if(req.isAuthenticated()) {
        console.log('User logged in successfully');
        return next();
    }
    else{
        req.session.redirectUrl = req.originalUrl;
        console.log(req.session.redirectUrl);
        req.flash("error","You Must Be Logged In Before Using This !");
        res.redirect('/login');
    }
}


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl =  req.session.redirectUrl;
    }
    else{ //if user directly log in that case it will handle else block
        res.locals.redirectUrl = "/listings";
    }
    next();
}


module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        // console.log(reviewItem);
    // console.log(res.locals.currUser);
        req.flash("error","You Don't Have Permisson Because You Aren't Owner Of This.");
        return res.redirect(`/listings/${id}`);
    }

    next();
}