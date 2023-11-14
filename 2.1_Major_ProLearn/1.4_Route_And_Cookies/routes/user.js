

const express = require("express");
const route = express.Router();


route.get("/",(req,res)=>{
    res.send("Users Page.");
});


route.get("/new",(req,res)=>{
    res.send("New User Page.");
});


route.get("/:id",(req,res)=>{
    res.send(`User ID Page.Entered ID: ${req.params.id}`);
});

module.exports = route;