

const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");


const sessionOptions = {
    secret:"mysecretcode",
    resave:false,
    saveUninitialized:true,
};

app.use(session(sessionOptions));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.test = "Testing";
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

// setting
app.set("view engine","ejs");


app.get("/",(req,res)=>{
    res.send("Home Page.");
});
app.get("/test",(req,res)=>{
    req.session.name = "AJAY MAHIWAL";
    console.log(req.session);
    res.send("Testing Page.");
});
/*
Session {
  cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true },
  name: 'AJAY MAHIWAL'
}
*/


app.get("/register",(req,res)=>{
    let {username = "User"} = req.query;
    req.session.username = username;
    if(req.session.username === "User"){
        req.flash("error","User Login Failed !");
    }else{
        req.flash("success","User Login Successfully !");
    }
    // res.send("Register With The Help Of Query, username.");
    res.redirect("/hello");
});


app.get("/hello",(req,res)=>{
// It Will only flash one time yani ak baar use kerte hi remove ho jata hai ye See in console
    // console.log(req.flash()); //{ success: [ 'User Login Successfully !' ] }
    // console.log(req.flash("success"));
    // console.log(res.locals); //[Object: null prototype] { name: 'hii' }
    // console.log(res.locals.djsk); //undefined

    
    // res.render("page.ejs",{name:req.session.username, msg:req.flash("success")});
    res.render("page.ejs",{name:req.session.username});
});





app.listen(3000,()=>{
    console.log("Server is running on port 3000.");
});