
const Review = require("../Models/review.js");
const Listing = require("../Models/listing.js");


module.exports.addNewReview = async(req,res)=>{
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
}


module.exports.destroyReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    console.log("i am at review route and delete method.And Review Deleted.");
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted !");

    res.redirect(`/listings/${id}`);
}