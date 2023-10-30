

const mongoose = require("mongoose");
const Listing = require("../Models/listing.js");
const initData = require("./data.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
.then(()=>{
    console.log("Connected With DB For Init");
})
.catch((err)=>{
    console.log(err);
});


const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();