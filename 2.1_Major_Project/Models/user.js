

const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');



const userSchema = new mongoose.Schema({
    email: {
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User",userSchema);