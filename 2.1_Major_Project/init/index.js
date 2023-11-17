

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
    initData.data = initData.data.map((obj)=>({...obj, owner:"65559f7ed28636064f436337"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();