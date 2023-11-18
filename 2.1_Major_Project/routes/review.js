const express = require("express");
const router = express.Router( {mergeParams:true} );
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../SchemaValidation.js")
const Listing = require("../Models/listing.js");
const Review = require("../Models/review.js");
const {isLoggedIn} = require("../middlewares/middleW.js");

const reviewController = require("../controllers/reviews.js");


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
router.post("/",
            isLoggedIn, 
            validateReviews,
            wrapAsync(reviewController.addNewReview)
        );


// DELETE REVIEW
router.delete("/:reviewId",
                isLoggedIn, 
                isReviewOwner, 
                wrapAsync(reviewController.destroyReview)
            );



module.exports = router;