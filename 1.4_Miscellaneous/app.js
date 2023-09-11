

const express = require("express");
const path = require("path");
const app = express();

// Setting some default things for project
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"viewss"));

// Here are all Middleware's who will execute for every kind of Request
app.use(express.static(path.join(__dirname,"StaticFiles")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/",(req,res)=>{
    // res.send("home app");
    res.render("home");
});
//GET Request
app.get("/register",(req,res)=>{
    // res.send("Standard Get Request.");
    let {username,pass} = req.query;
    res.render("register",{username});
});
//POST Request
app.post("/register",(req,res)=>{
    // res.send("Standard Post Request.");
    let {username,pass} = req.body;
    res.render("register",{username});
});


//Starting the Server
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000.");
});