
if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
    // console.log(process.env) // remove this after you've confirmed it is working
}


const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");


const reviewRouter = require("./routes/review.js");
const listingRouter = require("./routes/listing.js");
const userRouter = require("./routes/user.js");


// const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl);
}

main().then(() => {
        console.log("Connected With WanderLust DB");
    })
    .catch((err) => {
        console.log(err);
    });



const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // 24 Hours = 1 Day
});

store.on("error",()=>{
    console.log("Error in MongoSession Store",error);
});

const sessionOptions = {
    // store : store,
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, //today date ms + 7 day millisecond 
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, //used for security from XSS attack
    }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


//Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//setting for view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);






//Endpoints (Routes)

app.get("/", (req, res) => {
    res.render("./list/index.ejs", { layouts: false });
});


app.use("/listings/:id/reviews", reviewRouter);
app.use("/listings", listingRouter);
app.use("/", userRouter);


app.get("/demouser", wrapAsync(async (req, res) => {
    // let fakeUser = new User({
    //     email:"demouser@gmail.com",
    //     username:"demouser007",
    // });

    // let registeredUser = await User.register(fakeUser,"mypassword123"); // Convenience method to register a new user instance with a given password. Checks if username is unique.
    res.send(registeredUser);
}));






app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found."));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    let { status = 500, message = "Something Went Wrong." } = err;
    // res.status(status).send(`<h1>${message}</h1>`);

    if (message.substring(0, 23) === "Cast to ObjectId failed") {
        req.flash("error", "Listing You requested for does not exist !");
        res.redirect("/listings");
    }
    res.status(status).render("./list/error.ejs", { message });
});

app.listen(3000, () => {
    console.log("Server is Listing On Port 3000.");
});