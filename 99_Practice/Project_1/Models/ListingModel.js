

const mongoose = require("mongoose");



const listingSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        url:{
            type:String,
            set:(v)=>
            v==""
            ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60": v,
        },
    },
    price:{
        type:Number,
        min:0,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    reviews:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserReview",
      }
    ],
});


const Listing = mongoose.model("ListItem",listingSchema);

module.exports = Listing;