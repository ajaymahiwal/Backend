
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

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("chats.ejs",{chats});
});

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

    let chats = Chat.find();
    res.redirect("/chats");
});






app.listen(3000,()=>{
    console.log("Server is Listening on Port 3000.");
});