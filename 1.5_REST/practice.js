/**
 

//Date 21-09-2023

const express = require("express");
const app = express();
const path = require("path");

//app settings
app.set("view engine","ejs");
app.set("view",path.join(__dirname,"views"));

//middlewares
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//endpoints
app.get("/",(req,res)=>{
    res.send("<h1>Home page for today(21-09-23)</h1>");
})
app.listen(3000,(req,res)=>{
    console.log("server running very fine.");
})
 */



const express = require("express");
const app = express();
const path = require("path");


//Adding middlewares
app.use(express.static(path.join(__dirname, "publiccc"))); // folder for static files
app.use(express.urlencoded({extended:true})); // converting res.data 
app.use(express.json()); // converting

//Setting up project default setting
app.set("view engine","ejs"); // setting view engine
app.set("views",path.join(__dirname, "viewsss")); // folder path where these templates files will be stored



//Routes (Endpoints)
app.get("/",()=>{
    // res.render();
    // res.send("");
});
// .
// .
// .


// Starting the server
app.listen(3000,()=>{
    console.log("server is starting.");
});