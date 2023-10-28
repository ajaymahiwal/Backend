
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require('method-override');
const Chat = require("./Models/chats.js");


//middlewares
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(methodOverride('_method'));

//set basic settings
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(()=>{
    console.log("Connection Done.");
})
.catch((err)=>{
    console.log(err);
});




app.get("/",(req,res)=>{
    res.send("<h1>It's Working.</h1>");
});

//Show All Chats
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("chats.ejs",{chats});
});


//New Chat (Insert)
app.get("/chats/new",(req,res)=>{
    res.render("newChat");
});
app.post("/chats",(req,res)=>{
    let {from,to,msg} = req.body;
    let chat1 = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date(),
    });

    chat1.save()
    .then((data)=>{
        console.log("Saved");
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");
});


// Edit & Update Route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    // console.log(chat);
    res.render("edit",{ chat });
});

app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg:newMsg} = req.body;
    // console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true, new:true});

    // console.log(updatedChat);
    res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findByIdAndDelete(id);
    console.log(chat);
    res.redirect("/chats");
});



app.listen(3000,()=>{
    console.log("Server is Listening on Port 3000.");
});