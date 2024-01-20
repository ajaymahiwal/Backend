

# Middlewares 
----

middlewares ker skte hai 2 kaam:
1. response send
2. send control to next routes or next middlewares using next()

mostly, middlewares chaining ki jati hai fir kuch kaam perform kiye jate hai 


**Sample Code Of Middlewares**

```javascript
app.use((req,res)=>{
    console.log("I'm Middleware.");
    res.send("Okay");
});
```

```javascript
app.use((req,res,next)=>{
    console.log("I'm Middleware.");
    next(); //Now route ko aage check kiya jayega hai ya nhi
});
```

`app.use()` mein ager path define nhi kerte to ye sab path k liye execute kerega or har http methods k liye nhi jse get, post, put, patch, delete.

```javascript
app.use("/list",(req,res,next)=>{
    //Block Of Code
});
```
This Middleware only work with path `/list` route and all http methods.

----
```javascript
app.use((req,res,next)=>{
    console.log("I'm 2nd Middleware.");
    next(); 
    // return next();  //If this line used then next lines will not executed.
    console.log("Task Done after next(), usually not done in actual production");
});
```
// <br>


**Express Documentation**
<br>
Read [Middleware Docs](https://expressjs.com/en/guide/using-middleware.html)  <br>
Read [Middleware Docs](https://expressjs.com/en/guide/error-handling.html) <br>



# My Notes

**Middlewares in Express js**
In Express.js, middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle. They can be used to perform various tasks, such as authentication, logging, data validation, and more, before the final request handler (often called a route handler) is invoked. Middleware functions are executed sequentially in the order they are defined.

Here's how to use middleware in Express.js:

1. Writing a Basic Middleware Function:

```javascript
const express = require('express');
const app = express();

// Example of a middleware function
app.use((req, res, next) => {
  console.log('This is a middleware function');
  next(); // Call next to move to the next middleware or route handler
});

// Route handler
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the middleware function logs a message and then calls `next()` to pass control to the next middleware or the route handler.

2. Using Middleware for Specific Routes:

You can also apply middleware to specific routes by using the middleware function as an argument to the route method.

```javascript
const express = require('express');
const app = express();

// Middleware function
const myMiddleware = (req, res, next) => {
  console.log('This middleware is only for /special route');
  next();
};

// Middleware applied to a specific route
app.get('/special', myMiddleware, (req, res) => {
  res.send('This is a special route');
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the `myMiddleware` function is only applied to the `/special` route.

3. Using Third-Party Middleware:

Express.js provides a wide range of built-in middleware functions, and you can also use third-party middleware libraries to extend the functionality of your application. Common third-party middleware includes body parsers for handling form data and cookies, authentication middleware, and more. You can use these third-party middleware functions by adding them to your Express application using the `app.use()` method.

Here's an example of using the `body-parser` middleware to handle JSON data:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Use body-parser middleware to parse JSON data
app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
  console.log(req.body);
  res.send('Data received');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

These are the basics of using middleware in Express.js. Middleware is a powerful feature that allows you to add functionality to your routes and keep your code organized. You can also create custom middleware functions for tasks specific to your application.


**You can also create custom middleware functions for tasks specific to your application. ???**

Yes, you can create custom middleware functions in Express.js to handle tasks specific to your application. Custom middleware functions are often used to perform tasks such as authentication, data validation, logging, error handling, and more. Here's how you can create a custom middleware function:

1. Define a custom middleware function:

To create a custom middleware function, you define a function that takes three arguments: `req` (request object), `res` (response object), and `next` (the next middleware function in the stack). Here's an example:

```javascript
const customMiddleware = (req, res, next) => {
  // Your custom middleware logic goes here
  console.log('Custom middleware is executing');
  // Call next to pass control to the next middleware or route handler
  next();
};
```

2. Use your custom middleware:

You can use your custom middleware by adding it to your Express application using the `app.use()` method. Place it before the route or routes you want it to be applied to.

```javascript
const express = require('express');
const app = express();

// Custom middleware
const customMiddleware = (req, res, next) => {
  console.log('Custom middleware is executing');
  next();
};

// Apply the custom middleware to a specific route
app.use('/myroute', customMiddleware);

app.get('/myroute', (req, res) => {
  res.send('This is my custom route');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, the `customMiddleware` function is applied only to the `/myroute` route. When a request is made to `/myroute`, the custom middleware will execute before the route handler is invoked.

3. Using custom middleware for multiple routes:

You can also use custom middleware for multiple routes by adding it to the application using `app.use()` without specifying a specific route. This middleware will be executed for all routes defined after it in the code.

```javascript
const express = require('express');
const app = express();

// Custom middleware
const customMiddleware = (req, res, next) => {
  console.log('Custom middleware is executing');
  next();
};

// Apply the custom middleware to all routes
app.use(customMiddleware);

app.get('/route1', (req, res) => {
  res.send('This is route 1');
});

app.get('/route2', (req, res) => {
  res.send('This is route 2');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this case, the `customMiddleware` function will be executed for both `/route1` and `/route2`.

Custom middleware functions allow you to encapsulate and reuse specific functionality across different routes in your Express application, making your code more organized and maintainable.


**tell me more about next() function or what it is??**

In Express.js, the `next()` function is a callback function that is used to pass control from one middleware function to the next middleware function in the stack. It plays a crucial role in the request-response cycle of an Express application. When a middleware function completes its tasks, it can call `next()` to delegate control to the next middleware in line or the final route handler.

Here's a more detailed explanation of the `next()` function:

1. Execution Flow: When an HTTP request is received, Express processes it through a chain of middleware functions and route handlers. Each middleware function is called in the order they are defined, and they can choose to either complete the request-response cycle by sending a response to the client or pass control to the next middleware or route handler by calling `next()`.

2. Passing Control: By calling `next()`, a middleware function indicates that it has finished its work and that Express should continue processing the request. If `next()` is not called, the request can become "stuck," and the subsequent middleware functions or route handlers won't be executed.

3. Order of Execution: The order in which you place your middleware functions in the code matters. Middleware functions are executed sequentially in the order they are defined using `app.use()` or as arguments to specific routes. This allows you to control the flow of data and logic throughout your application.

Here's an example demonstrating the use of `next()`:

```javascript
const express = require('express');
const app = express();

// First middleware
app.use((req, res, next) => {
  console.log('First middleware');
  // Calling next() to pass control to the next middleware
  next();
});

// Second middleware
app.use((req, res, next) => {
  console.log('Second middleware');
  // Calling next() to pass control to the next middleware
  next();
});

// Route handler
app.get('/myroute', (req, res) => {
  console.log('Route handler');
  res.send('Response from route handler');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, when a request is made to `/myroute`, the first middleware is executed, followed by the second middleware. Both middleware functions call `next()`, which allows the request to reach the final route handler. After the route handler is executed, the response is sent to the client.

The `next()` function is a fundamental part of Express.js and allows you to create a flexible and modular application structure by chaining middleware functions together to handle various aspects of request processing.


**what about error handling in express.js middlewares**

Error handling in Express.js middlewares is a crucial aspect of building robust and reliable applications. Express provides mechanisms for handling errors that occur during the processing of requests, and it allows you to define error-handling middleware to manage and respond to errors gracefully. Here's how you can handle errors in Express.js middlewares:

1. Define Error-Handling Middleware:

To create an error-handling middleware, define a middleware function with four parameters instead of the usual three: `(err, req, res, next)`. The `err` parameter is used to capture any errors that may occur in previous middleware or route handlers.

```javascript
app.use((err, req, res, next) => {
  // Your error-handling logic here
  res.status(500).send('Something went wrong');
});
```

2. Triggering Error Handling:

You can trigger the error-handling middleware by calling `next()` with an error object as a parameter within any middleware or route handler. This will jump to the error-handling middleware, allowing you to handle the error appropriately.

```javascript
app.get('/myroute', (req, res, next) => {
  const err = new Error('This is a custom error');
  next(err);
});
```

3. Use `next(err)` for Asynchronous Errors:

If an error occurs asynchronously, you should pass the error to the `next()` function. For example, if you have a database query inside a `Promise` or an asynchronous function, you can handle errors as follows:

```javascript
app.get('/asyncroute', (req, res, next) => {
  someAsyncFunction()
    .then(result => {
      // Handle the result
    })
    .catch(err => {
      // Pass the error to the error-handling middleware
      next(err);
    });
});
```

4. Built-in Error Handling:

Express also provides some built-in error handling. For example, if an error occurs during request handling in the application, Express will automatically pass it to the error-handling middleware if you have one defined.

5. Handling Different Types of Errors:

You can use the `err` object to determine the type of error and respond accordingly. For example, you can check the error's `status` property to set the HTTP status code of the response or log the error for debugging purposes.

```javascript
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send('Not Found');
  } else {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  }
});
```

By defining and using error-handling middleware in your Express.js application, you can ensure that your application handles errors gracefully and provides meaningful responses to clients, improving the overall robustness and reliability of your web services.


**what is diffrence bw normal middleware and error middleware . And tell me differnce bw next() and next(err)**

The main differences between normal middleware and error middleware in Express.js lie in their purpose and the number of parameters they accept. Here's a summary of the distinctions:

1. Purpose and Usage:

   - **Normal Middleware**: Normal middleware functions are primarily used for handling tasks such as data validation, authentication, logging, and more during the regular processing of HTTP requests. They do not deal explicitly with errors. Normal middleware functions typically accept three parameters: `(req, res, next)`.

   - **Error Middleware**: Error middleware functions are specifically designed to handle errors that occur during request processing. They capture errors and respond to them in an appropriate manner. Error middleware functions typically accept four parameters: `(err, req, res, next)`.

2. Number of Parameters:

   - **Normal Middleware**:
     - Accepts three parameters: `(req, res, next)`.
     - `req`: The request object.
     - `res`: The response object.
     - `next`: The callback function used to pass control to the next middleware or route handler.

   - **Error Middleware**:
     - Accepts four parameters: `(err, req, res, next)`.
     - `err`: An error object that is passed to the middleware when an error is triggered in previous middleware or route handlers.
     - `req`: The request object.
     - `res`: The response object.
     - `next`: The callback function used to pass control to the next middleware or route handler (although it is rarely used in error middleware).

3. Error Handling:

   - **Normal Middleware**: Normal middleware is not focused on error handling. While you can include error handling logic within normal middleware, it is not its primary purpose. Errors occurring in normal middleware should typically be passed to the next middleware using `next(err)` if they cannot be handled within that middleware.

   - **Error Middleware**: Error middleware is explicitly designed to handle errors. When an error is passed to the `next()` function with the `err` parameter, Express will skip regular middleware and route handlers and jump directly to the error middleware for error handling.

To illustrate the difference between `next()` and `next(err)`:

- `next()`: This is used in normal middleware to pass control to the next middleware or route handler in the stack. It indicates that the current middleware has completed its task and that processing should continue as usual.

- `next(err)`: This is used to trigger error handling. When an error occurs within a middleware or route handler, you can call `next(err)` with the error object to pass control to the error middleware, where the error can be handled and a meaningful response can be sent to the client. It's a way to divert from the normal request processing flow and address errors specifically.

In summary, normal middleware and error middleware serve different purposes in an Express.js application, with normal middleware focusing on regular request processing tasks, and error middleware handling error scenarios with the help of the `err` parameter and `next(err)`.




**give me example of both next() and next(err) and tell me how they find next middleware which will execute i mean can next(err) can skip some non error handling middlewares then how ??**

Certainly, I'll provide examples of both `next()` and `next(err)` and explain how they find the next middleware to execute.

1. Using `next()`:

```javascript
const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
  console.log('Middleware 1');
  next(); // Pass control to the next middleware
});

// Middleware 2
app.use((req, res, next) => {
  console.log('Middleware 2');
  next(); // Pass control to the next middleware
});

// Route Handler
app.get('/route', (req, res) => {
  console.log('Route Handler');
  res.send('Response from route handler');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, when a request is made to `/route`, it goes through Middleware 1 and then Middleware 2 in sequence. Both of these middlewares call `next()` to pass control to the next middleware or route handler. As a result, the execution order is `Middleware 1` -> `Middleware 2` -> `Route Handler`.

2. Using `next(err)`:

```javascript
const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
  console.log('Middleware 1');
  const err = new Error('This is an error');
  next(err); // Pass control to error-handling middleware
});

// Middleware 2
app.use((req, res, next) => {
  console.log('Middleware 2');
  next(); // Pass control to the next middleware
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.log('Error-handling middleware');
  res.status(500).send('An error occurred: ' + err.message);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

In this example, when a request is made, `Middleware 1` generates an error and passes it to the error-handling middleware using `next(err)`. This causes the error-handling middleware to execute. `Middleware 2` is skipped in this case.

The key takeaway is that `next(err)` is used to skip regular (non-error-handling) middleware and jump directly to the error-handling middleware. It's a way to divert from the normal request processing flow and handle errors specifically. Once an error is passed to `next(err)`, Express will search for the next error-handling middleware (a middleware function with four parameters `(err, req, res, next)`) to handle the error. If no error-handling middleware is found further down the chain, the default Express error handling will occur, which may terminate the application.

To summarize:

- `next()` passes control to the next regular middleware or route handler in sequence.
- `next(err)` is used to trigger error handling, and it skips regular middleware to execute the next error-handling middleware in the stack.



    **Handling Async Errors**

When dealing with synchronous code and throwing an error within a middleware function, Express will automatically catch that error and pass it to the error-handling middleware. In this case, you don't need to explicitly call `next`.

Here's an example:

```javascript
app.use((req, res, next) => {
  // Synchronous code
  if (someErrorCondition) {
    // Express will handle this error automatically
    throw new Error('Some error occurred');
  }
  // Continue processing if no error
  next();
});
```

In the above example, if `someErrorCondition` is true, throwing an error will be automatically caught by Express, and it will skip to the error-handling middleware.

Now, in asynchronous code, if you're using `async/await`, you need to handle errors explicitly using `try/catch` and call `next` with the error if one occurs:

```javascript
app.use(async (req, res, next) => {
  try {
    // Asynchronous code
    const result = await someAsyncFunction();
    // Continue processing if no error
    next();
  } catch (error) {
    // Handle the asynchronous error
    next(error);
  }
});
```

In this asynchronous case, calling `next(error)` is necessary because Express won't automatically catch errors thrown in asynchronous code. It ensures that the error is properly propagated through the middleware stack and reaches the error-handling middleware.

So, in summary, with synchronous code, throwing an error is automatically handled by Express, but in asynchronous code, you need to explicitly call `next(error)` to handle errors properly.


And that's why we `wrapAsync` function for async routes body methods because there will no need to write try catch block if we use this it will handle the errors because it will return a promise because we will pass a async function in this as a parameter. and every async function return a promise and then we can catch that error and can call the next(err) which we trigger the error handling middleware.