

# Introduction to Express.js

Express.js is a powerful web application framework for Node.js that simplifies the process of building robust and scalable web applications. It provides tools and features to create both simple static websites and complex APIs with ease.

**Understanding Express:**

- **Middleware:**
  Express uses middleware to process requests before they reach the route handler. Middleware can handle tasks like logging, authentication, parsing request bodies, and more. You can write custom middleware functions or use third-party middleware packages.

- **Routing:**
  Express makes it easy to define routes and handle different HTTP methods (GET, POST, PUT, DELETE). You've seen a simple route in the example above. Routes can also include route parameters to capture dynamic values from the URL.

- **Static Files:**
  Express can serve static files like HTML, CSS, and client-side JavaScript using the `express.static` middleware. This is useful for creating complete web applications.

- **Views and Templates:**
  Express can integrate with template engines like EJS or Pug to generate dynamic HTML. This is especially helpful when you need to create web pages that display data from the server.

---

## Major Uses of Express.js

Express.js is a versatile web application framework that simplifies several crucial aspects of web development. Here are the major uses of Express.js:

1.  **Listening for Incoming Requests**

Express.js allows you to set up a server that listens for incoming requests from clients (usually web browsers). The server waits for requests and responds accordingly. This is the foundation of building web applications that can handle user interactions.

2.  **Parsing Incoming Requests**

When a request reaches the Express server, it needs to be parsed to extract relevant information. Express automatically parses the incoming requests and makes information like request method, URL, headers, and query parameters available to you. This enables you to understand what the client is asking for.

3.  **Matching Responses with Requests**

Express uses routes to match incoming requests to specific pieces of code that handle those requests. These routes are defined based on the request's method and URL pattern. Express ensures that the appropriate route is triggered for each incoming request.

4.  **Sending Suitable Responses According to Requests**

Once the appropriate route is matched, you can craft a suitable response to send back to the client. Responses can be HTML, JSON, files, or any other content. You use the `res` object to send these responses, ensuring that clients receive the information they expect.

---

Understanding and utilizing these major uses of Express.js is essential for building efficient and responsive web applications. Express handles the complexities of these tasks, allowing you to focus on creating valuable functionalities for your users.

---

## Getting Started with Express

1. **Setting Up Your Environment:**

   - Ensure Node.js is installed (`node -v`).
   - If not, download and install Node.js from the official website.

2. **Creating Your First Express Application:**

   - Create a project directory: `mkdir express-demo`
   - Navigate into the directory: `cd express-demo`
   - Initialize a Node.js project: `npm init -y`
   - Install Express: `npm install express`

3. **Basic Express Application:**

   - Create `app.js` in the project directory.
   - Add the following code:

   ```javascript
   const express = require("express");
   const app = express();

   app.get("/", (req, res) => {
     res.send("Hello, Express!");
   });

   const port = 3000;
   app.listen(port, () => {
     console.log(`Server started on port ${port}`);
   });
   ```

   Sure, let's break down the code in a simple and concise way:

1. `const express = require("express");`: We're bringing in a tool called Express.js that helps make web applications. This will return a function.

2. `const app = express();`: We're creating an "app" using Express. This app will handle our web requests. Here we are calling that function which is come from after requiring express.
After calling this function, this function will return a object in which all methods and properties are available of express.js and we will use them.
To check that Object just write give line: `console.dir(app);`

3. `app.get("/", (req, res) => { ... });`: When someone goes to the main page of our website (represented by "/"), our app will do something.

4. `(req, res) => { res.send("Hello, Express!"); }`: This is what our app does when someone visits the main page. It sends back the message "Hello, Express!".

5. `const port = 3000;`: We've decided our app will be available on a number called port 3000.
Note: IP address decides which device to send data but how to decide which application to send data in that device, that is doing using port address.

6. `app.listen(port, () => { ... });`: Our app is now ready to listen on port 3000 for visitors.

7. `console.log(`Server started on port ${port}`);`: We're telling the computer to show a message saying the server has started and on which port.

This code sets up a simple web server using Express.js. When you visit the main page (http://localhost:3000/) in your web browser, you'll see the message "Hello, Express!".

+ The listen method is like turning on your server and telling it which "door" (port) to listen on.
+ You pick a number (port) where your server will listen for visitors.
+ When you call app.listen(port), your server sets up a connection on that port.
+ Once the connection is established, your server can receive and respond to requests from web browsers.
+ You use the console.log function to show a message like "Server started on port 3000" to let you know your server is up and running.

4. **Running Your Express Application:**
   - Run: `node app.js`
   - Visit `http://localhost:3000` in your browser.

## Important Code Snippets

1. **Handling Requests and Sending Responses:**

  TO Handling Requests and Sending Responses is all about on which path, what things you want to show in your webpage, if user send request to that path. 
  Path examples are: / , /about , /menu  ETC.

   ```javascript
   app.get("/", (req, res) => {
     res.send("Hello, Express!");
   });
   ```

2. **Routing:**

Routing in Express refers to the process of defining how an application responds to a client request to a particular endpoint (URL) and HTTP method (GET, POST, etc.). With routing, you can organize your application's functionality into modular sections.

In Express, routes are defined using the HTTP method (e.g., `GET`, `POST`) and a URL pattern. When a client makes a request, Express matches the requested URL to the defined routes and executes the corresponding code.

Example of a basic route in Express:

```javascript
app.get("/about", (req, res) => {
  res.send("Welcome to the About page.");
});
```

## The `*` (Asterisk) in Express.js Routing

The `*` symbol, known as the "asterisk," is used in routing as a wildcard character. It's often referred to as a "catch-all" route. When you use `*` in a route definition, it matches any URL that hasn't been matched by other defined routes. This can be useful for handling 404 errors (page not found) or creating fallback routes.

Example of using the `*` symbol for a catch-all route:

```javascript
app.get("*", (req, res) => {
  res.send("404 - Page Not Found");
});
```

In this example, if no other route matches the requested URL, Express will execute this catch-all route and send a "404 - Page Not Found" response.

`app.use` is a method in Express.js used for adding middleware functions to the request-response chain. Middleware functions are executed in the order they are added to the application. They can be used for tasks like logging, authentication, parsing request bodies, and more.

Example of using `app.use` to log incoming requests:

```javascript
app.use((req, res, next) => {
  console.log(`Request received for ${req.url}`);
  next(); // Pass control to the next middleware
});
```

`app.get` is a method in Express.js used to define routes for handling GET requests. When a client makes a GET request to a specified URL, the corresponding route handler is executed.

Example of handling a GET request:

```javascript
app.get("/about", (req, res) => {
  res.send("Welcome to the About page.");
});
```

`app.post` is a method in Express.js used to define routes for handling POST requests. POST requests are often used to submit form data to the server. The route handler for a `app.post` route can access the data sent in the request body.

Example of handling a POST request:

```javascript
app.post("/submit", (req, res) => {
  const formData = req.body; // Access submitted form data
  // Process the form data and send a response
});
```

3. **Path Parameters:**
   _What are Path Parameters?_
   Path parameters in Express.js are placeholders in the URL that allow you to capture dynamic values from the client's request. They are denoted by a colon ':' , followed by a parameter name in the route definition. Path parameters are incredibly useful when you want to create routes that can handle different inputs without having to define a separate route for each possibility.

   ```javascript
   app.get("/users/:id", (req, res) => {
     const userId = req.params.id;
     // Use userId to fetch user data
   });
   ```

4. **Query Strings:**
   Query strings are used to pass additional data to the server as key-value pairs in the URL. They're often used for filtering, sorting, or pagination. For example, in the URL
   `example.com/search?q=express`, query is the key, and express is the value.

   ```javascript
   app.get("/search", (req, res) => {
     const searchTerm = req.query.q;
     // Use searchTerm for searching
   });
   ```

5. **Installing Nodemon:**
   Nodemon is a tool that helps in development by _automatically restarting_ your Node.js application whenever you make changes to your code. It saves you from manually stopping and restarting the server every time you modify your files.

   - Install: `npm install -g nodemon`
   - Run: `nodemon app.js`

---

Remember, this is just a basic overview of Express.js. As you continue learning, you'll dive deeper into topics like routing, middleware, database integration, and building APIs. Feel free to explore the official Express.js documentation and experiment with different features as you progress in your learning journey.
