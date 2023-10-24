

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const {v4: uuidv4 } = require("uuid");

// get the client
const mysql = require('mysql2');
const { connect } = require("http2");
// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    // host: '127.0.0.1',
    user: 'root',
    database: 'university_app',
    password: "ajay",
    port:"3306",
});


// middlewares which will run handle all kind of requests
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(methodOverride('_method'));


// set the basic settings
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// GET ROUTE
app.get("/",(req,res)=>{
    let q = "SELECT count(*) FROM user";
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            // console.log(result); //[{"count(*)":112}]
            // console.log(result[0]) //{"count(*)":112} // count(*) is key of this object
            let total = result[0]["count(*)"];
            //Node status code smaj rha tha is value ko jo res.send mein pass ker rhe the
            res.render("home",{total}); 
        })
    }
    catch(err){
        console.log(err);
    }
});



// SHOW ROUTE
app.get("/user",(req,res)=>{
    let q = "SELECT * FROM user";
    try{
        connection.query(q,(err,result)=>{
            let data = result;
            // console.log(data);
           res.render("user",{ data });; 
        });
    }
    catch(err){
        res.send("<h1>Something went wrong.</h1>")
    }
});



app.get("/user/new",(req,res)=>{
    res.render("newUser");
});

//View One user Data ROUTE
app.get("/user/:id",(req,res)=>{
    let {id} = req.params;
    let q = "SELECT * FROM user";
    try{
        connection.query(q,(err,result)=>{
            let data = result;
            // console.log(data);
            let userDATA = data.find((person)=> id === person.id);
            console.log(userDATA);
            if(userDATA){
                res.render("viewUser",{userDATA});
            }else{
                res.render("error");
            }
        });
    }
    catch(err){
        res.send("<h1>Something went wrong.</h1>")
    }
});

// Edit route
app.post("/user/:id/edit",(req,res)=>{
    let {id} = req.params;
    console.log("hiii");
    
    // let q = "SELECT * FROM user";
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q,(err,result)=>{
            let data = result;
            console.log(data);
            // let userDATA = data.find((person)=> id === person.id);
            let userDATA = result[0];
            console.log(userDATA);
            if(req.body.password == userDATA.password){
                res.render("edit",{userDATA});
            }else{
                res.render("error");
            }
        });
    }
    catch(err){
        res.send("<h1>Something went wrong.</h1>")
    }
});

app.patch("/user/:id",(req,res)=>{
    let {id} = req.params;
    // let q = "SELECT * FROM user";
    let q = `SELECT * FROM user WHERE id='${id}'`;
    try{
        connection.query(q,(err,result)=>{
            let data = result;
            console.log(data);
            // let userDATA = data.find((person)=> id === person.id);
            let userDATA = result[0];

            let newData=[req.body.username,req.body.email];
            let updateQuery = `UPDATE user SET username = '${newData[0]}', email='${newData[1]}' WHERE id = '${id}'`;

            try{
                 connection.query(updateQuery,(err,result)=>{
                    console.log(result);
                 });
            }catch(err){
                console.log(err);
            }

            res.redirect(`/user/${id}`);
        });
    }
    catch(err){
        res.send("<h1>Something went wrong.</h1>")
    }
})


app.post("/user/new",(req,res)=>{
    let id = uuidv4();
    let {username,email,password} = req.body;
    let q = "INSERT INTO user(id, username, email, password) VALUES (?, ?, ?, ?)";
    let newData = [`${id}`,`${username}`,`${email}`,`${password}`];

    try{
        connection.query(q,newData,(err,result)=>{
            if(err) throw err;
            console.log(result);

            res.redirect(`/user/${id}`);
        });
    }catch(err){
        res.render("error");
        console.log(err);
    }
});


app.delete("/user/:id",(req,res)=>{
    let {id} = req.params;
    let q = `DELETE FROM user WHERE id= '${id}' `;

    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log(result);
            res.redirect("/");
        });
    }
    catch(err){
        console.log(err);
    }
});


app.listen(3000,()=>{
    console.log("Server Is Listening On Port 3000.");
});


