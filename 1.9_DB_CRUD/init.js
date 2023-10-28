

//this file is used to add some data in whatsapp DB.

const mongoose = require("mongoose");
const Chat = require("./Models/chats.js");
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(()=>{
    console.log("connection created or connected with DB");
})
.catch((err)=>{
    console.log(err);
});


Chat.insertMany([
    {from:"RajKumar",to:"AjayMahiwal",msg:"Live your life in your way.",created_at:new Date()},
    {from:"Rahul",to:"Ragni",msg:"Stay Happy.",created_at:new Date()},
    {from:"Aman",to:"Gargi",msg:"Send me your noted.",created_at:new Date()},
    {from:"Raj",to:"Heena",msg:"Hello.",created_at:new Date()},
    {from:"Gargi",to:"Kirsan",msg:"How are You ?.",created_at:new Date()},
    {from:"Aman",to:"AjayMahiwal",msg:"Where are you Now ?",created_at:new Date()},
    {from:"AjayMahiwal",to:"Aman",msg:"Vrindavan.",created_at:new Date()},
]).then((data)=>{
    console.log(data);
});


