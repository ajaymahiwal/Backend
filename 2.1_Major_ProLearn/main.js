
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/Chat.js");

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








app.use((req,res)=>{
    console.log(req);
    res.send("hii");
});

//routes
app.get("/",async (req,res)=>{
    // console.log(await Chat.find());
    const chats = await Chat.find();
    res.render("home",{chats});
});

app.get("/api",(req,res)=>{
    console.log("API Route");
    res.status(200).send("Working Well");
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});