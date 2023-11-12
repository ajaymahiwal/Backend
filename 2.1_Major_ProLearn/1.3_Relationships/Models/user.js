

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
    username: String,
    address:[
        {   
            _id:false,
            location:String,
            city:String,
        },
    ],
});

const User = mongoose.model("user",userSchema);

const addUser = async()=>{
    let user1 = new User({
        username:"AjayMahiwal",
        address:[
            {
                location:"Main Road, HouseNo 5",
                city:"Sacha Khera",
            },
        ],
    });

    user1.address.push({location:"Near The Park, HouseNo 7", city:"Hisar"});

    let result = await user1.save();
    console.log(result);
}

addUser();