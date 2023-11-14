const express = require("express");
const route = express.Router( {mergeParams:true} );
const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../SchemaValidation.js")
const Review = require("../Models/review.js");




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




// POST REVIEW
// SET REVIEW
route.post("/",validateReviews, wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    let res1 = await newReview.save();
    let res2 = await listing.save();
    // console.log(res1,res2);

    console.log("New Review Saved.");
    res.redirect(`/listings/${listing._id}`);
}));


// DELETE REVIEW
route.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));



module.exports = route;