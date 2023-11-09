

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./Models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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
app.post("/listings",async (req,res)=>{
    // let {title,description,url,price,location,country} = req.body;
    let newItem = req.body.itemDetails;
    console.log(newItem);
    const item = new Listing(newItem);
    await item.save();

    res.redirect("/listings");
});


//Show One (Read)
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    
    console.log(item);
    res.render("show",{item});
});


app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let item = await Listing.findById(id);
    console.log(item);
    res.render("edit",{item});
});

app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let updatedItem = await Listing.findByIdAndUpdate(id,{...req.body.itemDetails},{runValidators:true,new:true});
    console.log(updatedItem);
    res.redirect(`/listings/${id}`);
});

app.delete("/listings/:id",async (req,res)=>{
    let{id} = req.params;
    let deletedItem = await Listing.findByIdAndDelete(id);
    console.log(deletedItem);
    console.log("Deleted");
    res.redirect("/listings");
});



app.listen(3000,()=>{
    console.log("Server is Listing On Port 3000.");
});