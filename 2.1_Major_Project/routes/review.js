const express = require("express");
const route = express.Router( {mergeParams:true} );
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../SchemaValidation.js")
const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
const {isLoggedIn} = require("../middlewares/middleW.js");




const validateReviews = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    console.log(error);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}

const isReviewOwner = async (req,res,next)=>{
    let {id,reviewId} = req.params;
    let reviewItem = await Review.findById(reviewId);
    if(!reviewItem.owner.equals(res.locals.currUser._id)){
        req.flash("error","You Don't Have Permisson Because You Aren't Owner Of This.");
        return res.redirect(`/listings/${id}`);
    }
   


    next();
}




// POST REVIEW
// SET REVIEW
route.post("/",isLoggedIn, validateReviews, wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.owner = req.user._id;

    listing.reviews.push(newReview);

    let res1 = await newReview.save();
    let res2 = await listing.save();
    // console.log(res1,res2);

    console.log("New Review Saved.");
    req.flash("success","New Review Added !");

    res.redirect(`/listings/${listing._id}`);
}));


// DELETE REVIEW
route.delete("/:reviewId",isLoggedIn, isReviewOwner, wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    console.log("i am at review route and delete method.");
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted !");

    res.redirect(`/listings`);
}));



module.exports = route;