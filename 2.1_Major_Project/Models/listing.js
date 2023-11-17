


const mongoose = require("mongoose");
const Review = require("./review.js");





const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename:{
      type:String,
    },
    url:{
      type:String,
      default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserReview",
    }
  ],
  owner: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
  }
});



// Mongoose Middleware jab listing delete krege to uske baad jo review hoge DB mein vo bhi delete ho jayege
listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});




const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;