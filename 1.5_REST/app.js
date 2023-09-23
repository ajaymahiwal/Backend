
//required packages
const express = require("express");
const app = express();
const path = require("path");

const {v4: uuidv4 } = require("uuid");

//setting 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//middlewares for all kind of request
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());


let allPosts = [
    {   id:uuidv4(),
        username:"ajaymahiwal5",
        content:"Discipline Makes you real Human Being. ~Ajay Mahiwal"
    },
    {   id:uuidv4(),
        username:"amanmahiwal",
        content:"ccusantium voluptatum iste modi ad, maiores sunt, dolorem tempore. Illum temporibus soluta fugit sed corporis quis labore est ducimus facere eveniet. Corporis laudantium similique ducimus voluptatum quidem officiis incidunt porro ab aspernatur delectus quae omnis ipsam, voluptatem rem nisi error facere. Saepe quisquam neque, omnis velit modi distinctio ex natus nostrum commodi ab tempora. Temporibus, architecto! Nisi."
    },
    {   id:uuidv4(),
        username:"raj007",
        content:"I got my 1st Internship with Google."
    }
];

app.get("/",(req,res)=>{
    res.render("home");
});
app.get("/posts",(req,res)=>{
    res.render("posts",{allPosts});
});
app.get("/blogs",(req,res)=>{
    res.send("Coming Soon.")
});
app.get("/help",(req,res)=>{
    res.send("Coming Soon.")
});


app.get("/posts/new",(req,res)=>{
    res.render("newPost");
});
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let {username,content} = req.body;
    allPosts.push({id,username,content});
    res.redirect("/posts");
});
app.get("/posts/:id",(req,res)=>{
    let postID = req.params.id;
    // console.log(postID);
    let post = allPosts.find((p)=> postID === p.id);
    // console.log(post);
    // res.send("Request Working Fine.");
    res.render("show.ejs",{post});
});


app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let newContent = req.body.content;
    let post = allPosts.find((p)=> id === p.id);
    post.content = newContent;
    console.log(post);
    res.send("Patch Request Working Fine.");
})


app.get("*",(req,res)=>{
    res.render("error");
});





app.listen(3000,()=>{
    console.log("Server is Running on port 3000.");
});