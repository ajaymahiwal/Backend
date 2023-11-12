


const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/relationships';


async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("Connected With DB.");
})
.catch((err)=>{
    console.log(err);
});


const userSchema = mongoose.Schema({
    username:String,
    email:String,
});

const Users = mongoose.model("Instauser",userSchema);

const postSchema = mongoose.Schema({
    content:String,
    likes:Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Instauser",
    },
});

const Post = mongoose.model("Post",postSchema);



const addData = async()=>{
    let user1 = new Users({
        username:"ajaymahiwal05",
        email:"ajay@gmail.com",
    });

    let post1 = new Post({
        content:"Hello World!",
        likes:10,
    });
    post1.user = user1;

    let res1 = await user1.save();
    let res2 = await post1.save();

    console.log(res1);
    console.log(res2);
}

// addData();

const findData = async()=>{
    let res1 = await Users.findOne({});
    let res2 = await Post.findOne({}).populate("user","username");
    // let res2 = await Post.findOne({}).populate("user");

    console.log(res1);
    console.log(res2);
}

findData();