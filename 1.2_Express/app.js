

const express = require("express");
const app = express();
// console.dir(app);

const port = 3000;
/**
 app.use((req,res)=>{
    // console.log(req);
    console.log("Request Coming");
    let code = "<h1>EveryThing Is Working.</h1>"
    res.send(code);
});
 */

// Endpoints
app.get("/",(req,res)=>{
    res.send("<h1>I am At Home Page</h1>");
});
app.get("/about",(req,res)=>{
    res.send("<h1>I am At About Page</h1>");
});
app.get("/profile",(req,res)=>{
    res.send("<h1>I am At About Page</h1>");
});

//Path ParaMeters In Endpoints

app.get("/:user",(req,res)=>{
    let username = req.params.user;
    res.send(`Hey, ${username}`);
})
app.get("*",(req,res)=>{
    res.send("<h1>404 - PageNot Found</h1>");
});


//Route
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});