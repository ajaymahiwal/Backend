

const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    comment:{
        type:String,
    },
});

const Review = mongoose.model("UserReview",reviewSchema);

module.exports = Review;