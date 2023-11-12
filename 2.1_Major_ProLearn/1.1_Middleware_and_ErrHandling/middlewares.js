

const express = require("express");
const app = express();
const ExpressError = require("./ExpressError.js");


app.use((req,res,next)=>{
    console.log("I'm 1st Middleware.");
    // res.send("Okay");
    next(); //Now route ko aage check kiya jayega hai ya nhi
});
app.use((req,res,next)=>{
    console.log("I'm 2nd Middleware.");
    next(); 
    // return next();
    // console.log("Task Done after next(), usually not done in actual production");
});




// Creating a Utility Middleware
// It Will give some information about request and path, It is a kind of Logger.
// app.use((req,res,next)=>{
//     console.log(req.method);
//     console.log(req.path);
//     console.log(req.hostname);

//     req.owner = "AJAY MAHIWAL"; //new property added in req object
//     // Middleware have power to make change in req,res objects.
//     console.log(req.owner);
//     next();
// });



app.use("/ajay",(req,res,next)=>{
    console.log("I'm Middleware,But I'll work only for /ajay path.");
    next();
});
app.get("/ajay",(req,res,next)=>{
    let errorAAGyi = new ExpressError(404,"Page Not Exits.");
    // let errorAAGyi = new ExpressError(404);
     next(errorAAGyi);
    // res.send("/ajay path.");
});


app.use("/ajay",(req,res,next)=>{
    console.log("Normal middleware for /ajay");
    res.send("hello");
});
app.use((err,req,res,next)=>{
    console.log("Error Middleware found for route /ajay.");
    let {status=500,message="By default error msg hu mein to"} = err;
    res.status(status).send(message);
});

app.get("/",(req,res)=>{
    res.send("Hello");
});

app.get("/random",(req,res)=>{
    console.log("Random Route Found.");
    res.send("Random Page");
});



const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token==="giveaccess"){
        return next();  // Yani ab aage route per ja skte ho permisson mil gyi
    }
    // res.send("Access Denied !");
    // throw new Error("Access Denied!"); //Our custom error msg
    throw new ExpressError(403,"Something Went Wrong.");
}

app.get("/api",checkToken,(req,res)=>{
    res.send("Welcome Dear,You can access Everything in Your Saved Data.");
});



app.get("/customerr",(req,res)=>{
    ajayj=ssd;
});



// Activity
app.get("/admin",(req,res)=>{
    throw new ExpressError(403,"You Can't Access Admin Route Data.");
});
app.use((err,req,res,next)=>{
    let {status,message} = err; 
    res.status(status).send(message);
});











// ager khi bhi specfic route mila hi nhi to last mein ye execute hojayega
app.use((req,res)=>{
    res.status(404).send("Page Not Found.");
});
//Start server
app.listen(3000);