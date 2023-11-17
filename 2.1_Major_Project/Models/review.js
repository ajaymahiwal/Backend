

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
});

const Review = mongoose.model("UserReview",reviewSchema);

module.exports = Review;



