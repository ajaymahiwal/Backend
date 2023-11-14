

const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const reviews = require("./routes/review.js");

const cookieParser = require("cookie-parser");
app.use(cookieParser("ajaymahiwalIsMySecertCode"));


app.get("/",(req,res)=>{
    res.send("Home Page.");
});

app.use("/users",users);
app.use("/posts",posts);
app.use("/users/:id/review",reviews);



app.get("/setcookies",(req,res)=>{
    res.cookie("user","ajaymahiwal DEV",{signed:true});
    res.send("Hii How Are You ?? I Am setting Some Cookies Check In Browser Inspect Mode.");
});

app.get("/getcookies",(req,res)=>{
    console.dir(req.cookies)
    console.dir(req.signedCookies)
    res.send(`hhdksaghjk`);
})



app.all("*",(req,res)=>{
    res.status(404).send("Page Not Found !");
});


app.listen(3000,()=>{
    console.log("Server Is Running On Port 3000.");
});








/*
app.get("/users",(req,res)=>{
    res.send("Users Page.");
});

app.get("/users/:id",(req,res)=>{
    res.send("User ID Page.");
});

app.get("/users/new",(req,res)=>{
    res.send("New User Page.");
});



app.get("/posts",(req,res)=>{
    res.send("Posts Page.");
});

app.get("/posts/:id",(req,res)=>{
    res.send("Post ID Page.");
});

app.get("/posts/new",(req,res)=>{
    res.send("New Post Page.");
});
*/