
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/Chat.js");
const ExpressError = require("./ExpressError.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/whatsapp';
async function main(){
    await mongoose.connect(MONGO_URL);
}
main()
.then(()=>{
    console.log("Connected With whatsapp DB.");
})
.catch((err)=>{
    console.log(err);
});


//middlewares (these will work for all paths or routes)
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

// setting
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));








// app.use((req,res)=>{
//     console.log(req);
//     res.send("hii");
// });

//routes
app.get("/",async (req,res)=>{
    // console.log(await Chat.find());
    const chats = await Chat.find();
    res.render("home",{chats});
});

app.get("/chats/new",(req,res)=>{
    throw new ExpressError(403,"You Can't Create New Posts.");
    // res.send("<h1>Hello India!</h1>");
});

/**
 *  
app.get("/chats/:id",async (req,res,next)=>{
    let{id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
    //     // throw new ExpressError(404,"Chat Not Found for this ID");
        return next(new ExpressError(404,"Chat Not Found for this ID"));
    }
    res.render("show",{chat});
});
 */
function wrapAsync(fn) {
    return function (req, res, next) {
      fn(req, res, next).catch((err) => next(err));
    };
  }
app.get("/chats/:id",wrapAsync(async (req,res,next)=>{
    let{id} = req.params;
    let chat = await Chat.findById(id);
    if(!chat){
    //     // throw new ExpressError(404,"Chat Not Found for this ID");
        return next(new ExpressError(404,"Chat Not Found for this ID"));
    }
    res.render("show",{chat});
}));


app.use((err,req,res,next)=>{
    console.log("Error Handling Middleware");
    let {status = 500,message = "Something Went Wrong!"} = err;
    res.status(status).send(message);
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});