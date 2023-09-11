

 # Miscellaneous Topics

 1. **Get and Post Request, & Handling Data from Requests**
 2. **JavaScript OOPs Concepts**


HTTP requests, specifically GET and POST, are fundamental in web development for sending and receiving data between a client (usually a web browser) and a server. In the context of web applications, `req.query` and `req.body` are two important objects in the Express.js framework used to access data sent by the client.

1. **GET Request**:
   - GET requests are used to request data from a specified resource.
   - They are typically used for fetching data from a server, and the data is sent as URL parameters.
   - In Express.js, you can access GET request data using `req.query`.

   ```javascript
   // Example URL: http://example.com/api/user?id=123&name=John
   const id = req.query.id;      // Retrieves "123"
   const name = req.query.name;  // Retrieves "John"
   ```

2. **POST Request**:
   - POST requests are used to send data to the server to create or update a resource.
   - They are often used for submitting forms, uploading files, or sending data in the request body.
   - In Express.js, you can access POST request data using `req.body`. However, to do so, you need to use middleware like `body-parser` or `express.urlencoded` to parse the request body.

   ```javascript
   
   // Assuming you have middleware set up to parse request bodies
   const username = req.body.username;
   const password = req.body.password;
   ```

   Make sure you have `express.urlencoded` or equivalent middleware added to your Express app to handle POST data.
   ```javascript
    const express = require('express');
    const app = express();

    // parse application/json, basically parse incoming Request Object as a JSON Object 
    app.use(express.json());

    // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
    app.use(express.urlencoded({ extended: false }));
    // combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
    app.use(express.urlencoded({ extended: true }));


    //app.use(express.urlencoded({ extended: boolean_value })); 
    //Use anyone line from given above two's 

    // ... Your routes and other middleware

    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
    ```

Here's a breakdown of these concepts:

- **req.query**:
   - Used to access data from GET requests.
   - Retrieves data from URL parameters.
   - Data is visible in the URL, which is why it's suitable for non-sensitive data and fetching resources.

- **req.body**:
   - Used to access data from POST requests.
   - Retrieves data from the request body, which can be used to send sensitive or large amounts of data.
   - Data is not visible in the URL, making it suitable for sensitive information like passwords.

When designing web applications, you'll often use a combination of GET and POST requests. GET requests are ideal for retrieving data, while POST requests are suitable for submitting data to the server. Accessing `req.query` and `req.body` allows you to work with the data sent by the client in your Express.js application, whether it's for displaying information or processing form submissions.



# OOPS (Object Oriented Programming Structure)
   
   All things are written in comments of OOPs.js file.
   For best pratice run this code and see output.