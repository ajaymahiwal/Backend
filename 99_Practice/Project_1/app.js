

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./Models/ListingModel.js");
const Review = require("./Models/Review.js");
const methodOverride = require('method-override')


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

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


app.get("/",(req,res)=>{
    res.render("./list/index");
});

app.get("/listings",async(req,res)=>{
    let listing = await Listing.find({});
    res.render("./list/listings",{listing});
});

app.get("/listings/new",(req,res)=>{
    res.render("./list/newlisting");
})


app.post("/listings",async(req,res,next)=>{
    try{
        let {listing} = req.body;
        let list = new Listing(listing);
        await list.save();
        console.log("New Listing Saved !");
        res.redirect("/listings");
    }
    catch(err){
        return next(err);
    }
});

app.get("/listings/:id",async(req,res,next)=>{
    try{
    let {id} = req.params;
    let list = await Listing.findById(id).populate("reviews");
    // console.log(list.reviews);
        res.render("./list/show",{list});
    }
    catch(err){
        return next(err);
    }
});

app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("./list/edit",{list});
});

app.post("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let newList = req.body.listing;
    let list = await Listing.findByIdAndUpdate(id,newList,{runValidators:true,new:true});
    console.log("Updated SUccessFully,",list);
    res.redirect(`/listings/${id}`);
});



app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let list = await Listing.findByIdAndDelete(id);
    console.log("Lisitng DELETED");
    res.redirect("/listings");
});


app.post("/listings/:id/review",async (req,res)=>{
    let {id} = req.params;
    let {review} = req.body;
    let list = await Listing.findById(id);
    let newReview = new Review(review);
    list.reviews.push(newReview);
    await newReview.save();
    await list.save();

    res.redirect(`/listings/${id}`);
});



app.use((err,req,res,next)=>{
    res.send(err.message);
});

app.listen(3000,()=>{
    console.log("Server is Working........");
});