
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email:String,
    name:String,
    img:String,
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user",userSchema);

module.exports = User;