

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./SchemaValidation.js")
const Review = require("./Models/review.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("Connected With WanderLust DB");
})
.catch((err)=>{
    console.log(err);
});

 
//Middlewares
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//setting for view engine
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.engine("ejs",ejsMate);



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




//Endpoints (Routes)

app.get("/",(req,res)=>{
    res.render("index.ejs",{ layouts: false });
});

//Show All 
app.get("/listings",async (req,res)=>{
    let list = await Listing.find({});
    
    // console.log(list);
    res.render("listing",{list});
});

// Create
app.get("/listings/new",async (req,res)=>{
    res.render("newItem");
});
app.post("/listings",validateListingData,wrapAsync(async(req,res,next)=>{

    const item = new Listing(req.body.itemDetails);
    await item.save();

    res.redirect("/listings");
}));


//Show One (Read)
app.get("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id).populate("reviews");
    
    console.log(item);
    res.render("show",{item});
}));



// EDIT
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    console.log(item);
    res.render("edit",{item});
}));

app.put("/listings/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    if(!req.body.itemDetails){
        next(new ExpressError(400,"Send Valid Data In Listing."))
    }
    let updatedItem = await Listing.findByIdAndUpdate(id,{...req.body.itemDetails},{runValidators:true,new:true});
    console.log(updatedItem);
    res.redirect(`/listings/${id}`);
}));


// DELETE
app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let{id} = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    console.log(deletedItem);
    console.log("Deleted");
    res.redirect("/listings");
}));






// POST REVIEW
// SET REVIEW
app.post("/listings/:id/reviews",validateReviews, wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    let res1 = await newReview.save();
    let res2 = await listing.save();
    // console.log(res1,res2);

    console.log("New Review Saved.");
    res.redirect(`/listings/${listing._id}`);
}));


// DELETE REVIEW
app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}));








app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found."));
});

// Error Handling Middleware
app.use((err,req,res,next)=>{
    let {status = 500,message = "Something Went Wrong."} = err;
    // res.status(status).send(`<h1>${message}</h1>`);
    res.status(status).render("error.ejs",{message});
});

app.listen(3000,()=>{
    console.log("Server is Listing On Port 3000.");
});