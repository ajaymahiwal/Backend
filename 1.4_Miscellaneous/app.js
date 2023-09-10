

const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname,"StaticFiles")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"viewss"));

app.get("/",(req,res)=>{
    // res.send("home app");
    res.render("home");
});
app.get("/register",(req,res)=>{
    let {username,pass} = req.query;
    res.render("register",{username});
});
app.post("/register",(req,res)=>{
    res.render("register");
});


//Starting the Server
app.listen(3000,(req,res)=>{
    console.log("app is running on port.");
});