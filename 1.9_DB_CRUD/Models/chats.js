
const mongoose = require("mongoose");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

main()
.then(()=>{
    console.log("connection done.");
})
.catch((err)=>{
    console.log(err);
});

const chatSchema = new mongoose.Schema({
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
});


const Chat = new mongoose.model("Chat",chatSchema);

module.exports = Chat;