Certainly! Below is the content formatted as a `README.md` file:

```markdown
# Passport JS Integration Guide

## Introduction

It is important to understand that the Passport JS framework consists of 2 separate libraries.

The first is the main “Passport JS” library, and the second is the relevant “strategy” library.

The primary “Passport JS” library is always required, and is used to maintain session information for authenticated users (i.e. you will import this library irrespective of the type of “Strategy” that you will use to authenticate the user). The secondary “strategy” library is dependent on the methodology you plan use to authenticate a user. e.g. “passport-local”, “passport-facebook”, “passport-oauth-google” etc.

The Passport JS framework abstracts the Login process into 2 separate parts, the “session management” (done by the “Passport JS library” ), and the “authentication” (done by the secondary “Strategy” library e.g. “passport-local” or “passport-facebook” or “passport-oauth-google” etc.)

## Passport JS

The “Passport JS” library connects with the “expression-session” library, and forms the basic scaffolding to attach the (authenticated) user information to the `req.session` object. The main Passport JS library deals with already authenticated users and does not play any part in actually authenticating the users. Its sole purpose is to maintain (attach) the (already authenticated) user to sessions.

```bash
$ npm i passport
$ npm i express-session
```

## Authentication Library

The secondary library is used for authenticating the users. Users could be authenticated against a username/password saved in a database that you created either locally or on a cloud (called “Local Strategy”), OR users could be authenticated by having them log into their Google account (“Google Authentication Strategy”), or Facebook, or Github account.

Install the secondary library based on the methodology or "Strategy" you will use to authenticate users.

E.g.
```bash
$ npm i passport-local
// in case you will be authenticating by comparing with username and password stored in your DB ("Local Strategy")
OR
$ npm i passport-google-oauth
// in case you will be authenticating using Google login
OR
$ npm i passport-facebook
// in case you will be authenticating using Facebook login
```

## Passport JS — Steps and Syntax

### Step 1: Import the libraries into your file

```javascript
// Import Express
const express = require('express');
const app = express();
// Import the main Passport and Express-Session library
const passport = require('passport');
const session = require('express-session');
// Import the secondary "Strategy" library
const LocalStrategy = require('passport-local').Strategy;
// In this example we will use the "local" strategy
```

### Step 2: Initialize Middleware

```javascript
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true,
}));
// This is the basic express session({..}) initialization.
app.use(passport.initialize());
// init passport on every route call.
app.use(passport.session());
// allow passport to use "express-session".
```

### Step 3: Use Passport to define the Authentication Strategy

```javascript
passport.use(new LocalStrategy (authUser));
// The "authUser" is a function that we will define later will contain the steps to authenticate a user and will return the "authenticated user".
```

### Step 3a: Define the “authUser” function to get authenticated Users

The “authUser” function is a callback function that is required within the LocalStrategy and can take three arguments. The “user” and “password” are populated from the “req.body.username” and “req.body.password”. These can be used to search the DB to find and authenticate the username/password that was entered in the “login” form.

```javascript
authUser = (user, password, done) => {
  // Search the user, password in the DB to authenticate the user
  // Let's assume that a search within your DB returned the username and password match for "Kyle".
  let authenticated_user = { id: 123, name: "Kyle" };
  return done(null, authenticated_user);
}
```

### Step 4: Serialize and De-Serialize (authenticated) users

#### SerializeUser:

```javascript
passport.serializeUser( (userObj, done) => {
    done(null, userObj);
})
```

**WHAT DOES SERIALIZE USER MEAN?**

1. "express-session" creates a `req.session` object when it is invoked via `app.use(session({..}))`
2. "passport" then adds an additional object `req.session.passport` to this `req.session`.
3. All the `serializeUser()` function does is, receives the "authenticated user" object from the "Strategy" framework and attaches the authenticated user to `req.session.passport.user.{..}`

#### De-serialize User:

```javascript
passport.deserializeUser((userObj, done) => {
    done(null, userObj);
})
```

**WHAT DOES DE-SERIALIZE USER MEAN?**

1. Passport JS conveniently populates the "userObj" value in the `deserializeUser()` with the object attached at the end of `req.session.passport.user.{..}`
2. When the `done(null, user)` function is called in the `deserializeUser()`, Passport JS takes this last object attached to `req.session.passport.user.{..}` and attaches it to `req.user.{..}` i.e `req.user.{id: 123, name: "Kyle"}`
3. So "req.user" will contain the authenticated user object for that session, and you can use it in any of the routes in the Node JS app.

### Step 5: Use `passport.authenticate()` as middleware on your login route

Now you can use `passport.authenticate()` function within the `app.post()` and specify the `successRedirect` and `failureRedirect`.

```javascript
app.post("/login", passport.authenticate('local', {
   successRedirect: "/dashboard",
   failureRedirect: "/login",
}))
```

The ‘local’ signifies that we are using ‘local’ strategy. If you were using google or facebook to authenticate, it would say ‘google’ or ‘facebook’ instead of ‘local’.

### Step 6: Use the “req.isAuthenticated()” function to protect logged in routes

Passport JS conveniently provides a `req.isAuthenticated()` function that returns `true` if an authenticated user is present in `req.session.passport.user`, or `false` if no authenticated user is present in `req.session.passport.user`.

The `req.isAuthenticated()` function can be used to protect routes that can be accessed only after a user is logged in e.g. dashboard.

Create a function as follows:

```javascript
checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect("/login");
}
```

Now you can use this function as middleware to protect your routes:

```javascript
app.get("/dashboard", checkAuthenticated, (req, res) => {
  res.render("dashboard.ejs", { name: req.user.name });
})
```

Similarly, if the user is already logged in and attempts to access the “register” or “login” screen, you can direct them to the (protected) “dashboard screen.

Create a function as follows:

```javascript
checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { 
       return res.redirect("/dashboard");
   }
  next();
}
```

Now you can use this function as middleware as follows:

```javascript
app.get("/login", checkLoggedIn, (req, res) => {     
     res.render("login.ejs");
})
```

### Step 7: Use `req.logOut()` to clear the sessions object

Passport JS also conveniently provides us with a `req.logOut()` function, which when called clears the `req.session.passport` object and removes any attached params.

This can be used to implement log out as follows:

```javascript
app.delete("/logout", (req,res) => {
   req.logOut();
   res.redirect("/login");
   console.log(`-------> User Logged out`);
})
```

Note that when the `req.logOut()` function is called, it clears both the `req.session.passport` and the `req.user` i.e.

- `req.session.passport` -------> {}
- `req.user` ------->  undefined

## Passport JS — In Action

To really see what is happening under the hood and what exactly passport is doing, we will use the following simple example.

The `login.ejs` and `dashboard.ejs` files are in the /views folder and are very basic.

The `dashboard.ejs` simply will display the “name” of user logged in.

```ejs
<h1> <%= name %> is logged in </h1>
```

The `index.ejs` is a simple form that accepts “username” and “password”.

```ejs
<h1> Login </h1>
<form action="/login" method="POST">
   USER <input type="text" name="username">
   PASSWORD <input type="password" name="password">
   <button type="submit"> Submit </button>
</form>
```

1. Run the above `app.js` and visit http://localhost:3001/login, you will see the following:

   The `console.log()` will show the following:

   **Console.log (before the SUBMIT button is clicked)**
   
   1. Notice that since we have not yet entered anything in username and password, the `req.body` is undefined, as are most of the other `req.xx.xx`.
   2. Also notice that the `req.session` already exists.

2. Enter some username and password, and click on submit.

   Enter user “Kyle” and password “password123”, and click Submit.

   After the submit button is clicked, the App will show “Kyle is logged in”. The `console.log()` will show the following:

   **Console.log (after the SUBMIT button is clicked)**
   
   1. Notice that after the submit button is clicked "Passport JS" gets into action.
   2. In the `authUser` function, Passport JS sets "user" to `req.body.username` and "password" to `req.body.password`, that it gets from the LOGIN FORM.
   NOTE: these are the "name" tags that you used in the HTML FORM. By default "Passport JS" assumes that you will name them "username" and "password" as the username and password. In case you have named your text fields differently in your HTML forms e.g. `NAME <input type="text" name="uname"> PASSWORD <input type="text" name="pwd">` then, you can override the default settings within Passport JS, by including this where you define your "Strategy" i.e. within `passport.use(new LocalStrategy ({..}, authUser))` you will add an additional object as the first parameter,
   `passport.use(new LocalStrategy({ usernameField: "uname", passwordField: "pwd" }, authUser))`
   3. Passport then calls the `authUser` function and the User is authenticated (using whichever strategy you have set).
   4. Passport passes the authenticated user object to `serializeUser()` to add to `req.session.passport.user = {id: user.id}`.
   5. Passport extracts the "id" from `req.session.passport.user = {id: user.id}`, and passes it to `deserializeUser()`, so that the "id" can be used to search for the user in the DB (to display additional user information).
   6. Passport then sets the `req.user` to the "user" returned by the `deserializeUser()`.
   7. The `req.user` can now be used within the `res.render("login.ejs" {name: req.user.name})`, and the `login.ejs` file renders "Kyle has logged in".

And that’s it! The key takeaway is that the passport framework consists of the primary “Passport JS” library (that is used to manage sessions using “express-session” and attach {authenticated_user} to `req.session.passport`), and the secondary “Strategy” library (e.g. “local authentication”, or “google authentication” or “facebook authentication”), which is used to authenticate the user and pass this “authenticated_user” to the main Passport library.

A summary of the steps to integrating Passport JS are,

1. `app.use (passport.initialize())`
2. `app.use (passport.session())`
3. `passport.use(new LocalStrategy (authUser))` 3a. Define the "authUser" function, and authenticate the user. Pass this {authenticate_user} to the `passport.serialize()`
4. `passport.serializeUser()` //attach the {authenticate_user} to `req.session.passport.user.{authenticated_user}` `passport.deserializeUser()` //get the {authenticated_user} for the session from "req.session.passport.user.{authenticated_user}, and attach it to `req.user.{authenticated_user}`
5. Use `passport.authenticate()` in the "login" route and define the success and failure redirects i.e. `app.post ("/login", passport.authenticate('local', { successRedirect: "/dashboard", failureRedirect: "/login", }))`
6. Use the `req.isAuthenticated()` function to protect logged-in routes 7. Use `req.logOut()` to clear the sessions object, and log the user out

Note that to integrate Passport JS into your application, you will always follow all the steps [1–7] above, irrespective of the “strategy” that you use to authenticate. The only thing that will change is, — In Step 3, you will specify the “Strategy” you want to use to authenticate. — In Step 3a, the “authUser” function will be custom to the “strategy” that you use to get the “authenticated_user”

So Passport JS completely standardizes “session management”, and you can always use the `req.user`, `req.isAuthenticated()`, `req.logOut` within your NodeJS applications that use Passport JS, irrespective of the type of “Strategy” library that you used to authenticate the user i.e. “local-strategy”, “facebook”, “google” etc.

## References

Here are some great references that helped me understand Passport JS,

- [YouTube Video](https://www.youtube.com/watch?v=-RCnNyD0L-s&t=3s)
- [Stack Overflow - Understanding Passport Serialize Deserialize](https://stackoverflow.com/questions/27637609/understanding