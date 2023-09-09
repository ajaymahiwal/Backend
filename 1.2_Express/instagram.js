

const user = require("./users");

const express = require("express");
const app = express();



//ENDpoints
app.get("/",(req,res)=>{
    console.log("Home Page");
    res.send("<h1>Instagram Home Page</h1>");
});

//Query Strings
//http://localhost:3000/search?q=google
app.get("/search",(req,res)=>{
    console.log(req.query);
    let {q} = req.query;
    if(!q){
        res.send(`<h1>Nothing Searched Yet.</h1>`);
    }
    else{
        res.send(`<h1>Search Results is : ${q}</h1>`);
    }
});

//Path Parameters
app.get("/:username",(req,res)=>{
    let userName = req.params.username;
    console.log(user[userName]);
    if(user[userName]){
        res.send(`<h1>Hey ${user[userName].name}, Happy to See you here.</h1>`);
        
    }else{
        res.send("<h1>User Not Exits 404 - Page NOt Found.</h1>")
    }
});




//Route
app.listen(3000,(req,res)=>{
    console.log("Server is Running On Port 3000");
})