

const mongoose = require("mongoose");

// const MONGO_URL = 'mongodb://127.0.0.1:27017/whatsapp';

// async function main(){
//     await monogoose.connect(MONGO_URL);
// }

// main()
// .then(()=>{
//     console.log("Connected With DB.");
// })
// .catch((err)=>{
//     console.log(err);
// });


const chat_schema = new mongoose.Schema(
    {
        from:{
            type:String,
            required:true,
        },
        to:{
            type:String,
            required:true,
        },
        msg:{
            type:String,
        },
        created_at:{
            type:Date,
        },
    }
);

const Chat = new mongoose.model("Chat",chat_schema);

module.exports = Chat;