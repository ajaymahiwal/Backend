

const express = require("express");
const app = express();

//require built-in Node.js path module 
const path = require("path");

// app.use(express.static("public"));
//Adding a middleware which will provide the static files location in this given folder
//By default name for static files should be public but you can change by using given below line and access files from anywhere if server is starting outside the directory
app.use(express.static(path.join(__dirname,"publiccc")));

//Set the template engine as EJS
app.set("view engine","ejs");  
//Setting the ejs files folders name by default views to custom-folder-name (viewsss)
//and access EJS files from anywhere if server is starting outside the directory
app.set("views",path.join(__dirname,"/viewsss"));




// ROUTES 
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



//Starting the Server
const port = 8080;
app.listen(port,()=>{
    console.log(`Server is Running on port ${port} `);
});

// Or
// app.listen(8080);