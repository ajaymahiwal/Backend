

const express = require("express");
const route = express.Router();


route.get("/",(req,res)=>{
    res.send("Posts Page.");
});

route.get("/new",(req,res)=>{
    res.send("New Post Page.");
});

route.get("/:id",(req,res)=>{
    res.send(`Post ID Page. Entered ID: ${req.params.id}`);
});


module.exports = route;