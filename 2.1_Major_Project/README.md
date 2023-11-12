

# Getting Started

**All Steps During Project Making:**


**Phase-1 (part-a)**
<br>
-npm init -y<br>
-install express,ejs,mongoose<br>
-create app.js & require installed packages<br>
-start server app.listen();<br>
-connect with DB <br>
----
-require path and created public and views folder<br>
-added middlewares and setup some setting related to view engine<br>
-Create a Model for all Listings<br>
-Insert Data in DB Create init folder and then insert.<br>

-create show all list items route<br>
-create show one item route <br>
item.price.toLocaleString("en-IN")<br>

-Create edit and update route<br>
-Create delete route<br>
-------------------------------------
**Phase-1 (part-b)**

-EJS Mate<br>
Ak asa tarika jisme kuch files bna lete hai or un mein kush code likte hai fir  is trike se unse files mein add ker lete hai <% layout('/layouts/boilerplate') %>
jis file mein ye line likh dege uska code is boilerplate.ejs file mein or is code : <%- body %> mein store hoga yani vo sara code us file ka ab is body naam k line mein refer hoga.
BoilerPlate vali jo file bnai hai vo or bhi bna skate hai fir bus layout vale line code mein us file ka naam likh dege jo common code or as a boilerplate treat hona chata hai.
Main or Sara control screen layout or code structure ka  boilerplate vali file k pass hoga.<br>

<!-- I Made a Video on this see in gallary -->
<br>
-create navbar using bootstrap<br>
-link first into files and for icons i used font-awesome<br>
-create footer<br>









# JOI Package used for validation

```javascript
app.post("/listings",wrapAsync(async(req,res,next)=>{
  /*
    let {title,description,url,price,location,country} = req.body;
    let newItem = req.body.itemDetails;
    if(!newItem){
        throw new ExpressError(400,"Send Valid Data In Listing.");
    }
    console.log("Current Item Is", newItem);
  */
    // JOI Validation Used Here
    let result = listingSchema.validate(req.body);
    console.log(result);
    if(result.error){
        throw new ExpressError(400, result.error);
    }

    const item = new Listing(newItem);
    await item.save();

    res.redirect("/listings");
}));
```


<br><br>

# Doubts

**Doubt Releted to set(v) function in mongoose**

In the provided code snippet, the `set` function is used as part of a Mongoose schema for a field named "image." Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js that provides a way to define the structure and behavior of documents in a MongoDB collection.

The `set` function in Mongoose allows you to define a function that processes and modifies the value of a field before it is saved to the database. In this specific case, the `set` function is used to set a default value for the "image" field if it is an empty string. This is a way to handle cases where the field is provided with an empty string as a value.

Here's a breakdown of how the `set` function is used in your code:

1. The `set` function is defined as part of the schema for the "image" field.
2. It takes a single argument `v`, which represents the value that is about to be set for the "image" field.
3. Inside the `set` function, there is a conditional check: `v === ""`. This checks if the provided value is an empty string.

   - If the provided value is an empty string (`v === ""`), the `set` function returns the default image URL.

   - If the provided value is not an empty string, the `set` function returns the provided value as is (`v`).

The purpose of using the `set` function in this context is to ensure that even if an empty string is provided for the "image" field when saving a document, the default image URL is used instead. This is a form of data validation and normalization that helps maintain consistent data in the database.

---------

Yes, you can remove the `default` field in the schema definition if you're using the `set` function to handle the default value for the "image" field. The `set` function effectively replaces the need for a `default` value because it allows you to specify the default behavior directly within the function.

Here's how your schema definition would look without the `default` field:

```javascript
image: {
  type: String,
  set: (v) =>
    v === ""
      ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
      : v,
},
```

This code will work the same way as the previous version, providing a default image URL when an empty string is provided for the "image" field. Removing the `default` field and relying on the `set` function is a cleaner and more explicit way to define the default behavior for this field in Mongoose schemas.
