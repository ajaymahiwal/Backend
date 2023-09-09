

const express = require("express");
const app = express();

//require built-in Node.js path module 
const path = require("path");

// app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"publiccc")));

//Set the template engine as EJS
app.set("view engine","ejs");  

app.set("views",path.join(__dirname,"/viewsss"));
app.get("/",(req,res)=>{
    res.send("<h1>Welcome dude, in Home Page.</h1>");
});

app.get("/help",(req,res)=>{
    // res.send("<h1>Help Page</h1>");
    res.render("help.ejs");
});

app.get("/:username",(req,res)=>{
    const userData = require("./data.json");
    // const userName = req.params.username;
    const {username} = req.params;
    if(userData[username]){
        res.render("userProfile.ejs",{allUserData:userData[username]});
    }else{
        res.render("error.ejs");
        //Or we can render any static file for 404 page
    }
});


app.get("*",(req,res)=>{
    res.send("<h1>404 - Page Not Found.</h1>");
});



//Route
const port = 8080;
app.listen(port,()=>{
    console.log(`Server is Running on port ${port} `);
});