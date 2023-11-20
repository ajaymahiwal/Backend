
const mongoose = require("mongoose");
const listData = require("./data.js");
const Listing = require("../Models/ListingModel.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/project1");
}

main()
.then(()=>{
    console.log("Connected With DB.");
})
.catch((err)=>{
    console.log(err);
});


async function init(){
    // console.log(listData.data);
    await Listing.insertMany(listData.data);
    console.log("Data Inserted");
};

init();