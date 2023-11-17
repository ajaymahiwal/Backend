const express = require("express");
const route = express.Router();
const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../SchemaValidation.js")
const {isLoggedIn,isOwner} = require("../middlewares/middleW.js");




const validateListingData = (req,res,next)=>{
    // JOI Validation Used Here
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        // throw new ExpressError(400, error);
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
}







//Show All 
route.get("/",async (req,res)=>{
    let list = await Listing.find({});
    
    // console.log(list);
    res.render("./list/listing.ejs",{list});
});

// Create
route.get("/new",isLoggedIn,async(req,res)=>{
    res.render("./list/newItem.ejs");
});

route.post("/",isLoggedIn,validateListingData,wrapAsync(async(req,res,next)=>{

    const item = new Listing(req.body.itemDetails);
    item.owner = req.user._id;
    await item.save(); 
    req.flash("success","New Listing Added !");
    res.redirect("/listings");
}));


//Show One (Read)
route.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"owner",
        },
    })
    .populate("owner");

    if(!item){
        req.flash("error","Listing You requested for does not exist !");
        res.redirect("/listings");
    }
    // console.log(item);
    res.render("./list/show.ejs",{item});
}));



// EDIT
route.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    if(!item){
        req.flash("error","Listing You requested for does not exist !");
        res.redirect("/listings");
    }
    // console.log(item);
    res.render("./list/edit.ejs",{item});
}));

route.put("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let {id} = req.params;
    if(!req.body.itemDetails){
        next(new ExpressError(400,"Send Valid Data In Listing."))
    }
    let updatedItem = await Listing.findByIdAndUpdate(id,{...req.body.itemDetails},{runValidators:true,new:true});
    // console.log(updatedItem);
    req.flash("success","Listing Updated !");

    res.redirect(`/listings/${id}`);
}));


// DELETE
route.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req,res)=>{
    let{id} = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    // console.log(deletedItem);
    console.log("Listing Deleted");
    req.flash("success","Listing Deleted !");
    res.redirect("/listings");
}));




module.exports = route;