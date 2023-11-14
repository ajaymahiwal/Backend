

const express = require("express");
const route = express.Router( {mergeParams:true} );


route.get("/",(req,res)=>{
    res.send(`ALL reviews Of User ID:${req.params.id}`);
});

route.get("/:reviewId",(req,res)=>{
    res.send(`Review Of User ID:${req.params.id} And Review ID :${req.params.reviewId}`);
});


module.exports = route;