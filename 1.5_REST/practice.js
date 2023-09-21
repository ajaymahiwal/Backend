
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