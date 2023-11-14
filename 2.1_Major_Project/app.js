

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const listing = require("./routes/listing.js");
const review = require("./routes/review.js");



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






//Endpoints (Routes)

app.get("/",(req,res)=>{
    res.render("index.ejs",{ layouts: false });
});


app.use("/listings",listing);
app.use("/listings/:id/reviews",review);






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