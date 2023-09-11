Let's delve into templating, EJS (Embedded JavaScript), and how views work in Express.js:

## Templating and EJS in Backend

### Templating:
In the context of backend development, templating refers to the practice of dynamically generating HTML content by combining data with predefined template structures. This is particularly useful for building web pages that display information from a server, like user profiles or product listings.
Here's names of some popular template engines:

1. **Handlebars**: Minimalistic, uses `{{ ... }}` for variables, supports helper functions.

2. **Pug (Jade)**: Clean and concise syntax, uses indentation, whitespace-sensitive.

3. **Mustache**: Logic-less, uses `{{ ... }}` for variables and simple tags for control structures.

4. **Nunjucks**: Syntax similar to Jinja2/Twig, supports template inheritance and macros.

5. **EJS (Embedded JavaScript)**: Familiar JavaScript syntax, allows embedding JavaScript code.

6. **Swig**: Inspired by Django templates, clean syntax for variables and control structures.

7. **Haml**: Inspired by Ruby, uses indentation, concise, and Ruby-like.

8. **Eco**: Compiles CoffeeScript into HTML, concise and clean syntax.

9. **Slim**: Lightweight and concise for Ruby, uses indentation, compact templates.

10. **Marko**: High-performance, supports asynchronous rendering, developed by eBay.

Choose a template engine based on your project's needs and your familiarity with the syntax.


### Why We Use Templates ?
1. For Dynamic Content In Webpage
2. Code Reuseability
3. Consistency
4. Security (Helps to prevent XSS attacks)
5. Server Side Rendering :
    In some cases, templates are essential for server-side rendering (SSR). SSR is a technique that generates HTML on the server and sends it to the client, improving performance and SEO. Templates play a pivotal role in rendering HTML on the server before sending it to the browser.
6. Data Handling


### EJS (Embedded JavaScript):
EJS is a popular template engine for JavaScript that allows you to embed JavaScript code directly into your HTML templates. It makes creating dynamic content easier by letting you mix HTML and JavaScript seamlessly.

## Views in Express.js

### What are Views?
In Express.js, views are the templates used to generate the HTML content that will be sent to the client's browser. They are responsible for presenting data from the server to the user. Views allow you to keep your HTML and presentation logic separate from your application logic.

### Views Directory:
In Express, the views are stored in a directory, typically named "views." This directory contains your template files (EJS files) that define how your web pages should look. Express expects this directory to be present, but you can customize its location if needed.

### Using EJS for Views:
When you use EJS as your template engine, you can embed JavaScript directly into your HTML templates. This makes it easy to inject dynamic data into your web pages. EJS uses special tags to execute JavaScript code within your HTML.

    ```javascript
    //Set the template engine as EJS
    app.set("view engine","ejs");  
    //Setting the ejs files folders name by default views to custom-folder-name (viewsss)
    //and access EJS files from anywhere if server is starting outside the directory
    app.set("views",path.join(__dirname,"/viewsss"));
    ```
### Basic Example:
Here's a basic example of how you might use EJS in Express.js:

1. Create an EJS file in your "views" directory, e.g., `profile.ejs`.
2. In `profile.ejs`, you can embed JavaScript code using EJS tags like `<% %>`. For example:
   html
   <h1>Welcome, <%= username %>!</h1>
   
3. In your route handler, render the EJS template and pass data:
   javascript
   app.get('/profile', (req, res) => {
       const username = 'John'; // Replace with data from your application
       res.render('profile', { username });
   });
   
4. When a user visits `/profile`, Express will render the `profile.ejs` template with the provided data.

### Views Naming:
While it's not compulsory to name your views in a certain way, it's a common practice to use meaningful names that reflect the purpose of the template. For example, `profile.ejs` might represent a user's profile page.

In essence, views and EJS work together to dynamically generate HTML content that is sent to users' browsers. EJS tags allow you to inject data and logic directly into your templates, making your web pages come alive with dynamic content.



# EJS Code Examples

These are practical EJS syntax and code examples that can be valuable for your web development projects.

## Conditional Statements

```ejs
<% if (user.isAdmin) { %>
  <p>Welcome, Admin!</p>
<% } else { %>
  <p>Welcome, User!</p>
<% } %>
```

## Looping through Arrays

```ejs
<ul>
  <% users.forEach(function(user) { %>
    <li><%= user.name %></li>
  <% }); %>
</ul>
```

## Displaying Variables

```ejs
<h1><%= pageTitle %></h1>
```

## Escaping HTML

```ejs
<p><%- user.description %></p>
```

## Including Other Templates (Partials)

```ejs
<%- include('header.ejs') %>
```

## Using Custom Helper Functions

```ejs
<p>Formatted Date: <%= formatDate(user.createdAt) %></p>
```

## Iterating Through Object Properties

```ejs
<ul>
  <% for (let key in user) { %>
    <li><%= key %>: <%= user[key] %></li>
  <% } %>
</ul>
```

## Comments in EJS Templates

```ejs
<%# This is a comment %>
```

## Passing Data from Express Route to Template

```javascript
app.get('/profile', (req, res) => {
  const userData = { username: 'JohnDoe', age: 30 };
  res.render('profile', { user: userData });
});
```

## Using EJS Layouts with Variables

```ejs
<%- include('header.ejs', { pageTitle: 'Home Page' }) %>
```

These examples cover fundamental EJS syntax and code patterns that are commonly used in web development projects. EJS is known for its simplicity and compatibility with JavaScript, making it a convenient choice for dynamic content rendering.


Feel free to explore [EJS's documentation](https://ejs.co/) and experiment with creating dynamic views in your Express.js applications!

---

# Serving Static Files
  When we want to add some static files in our templates then we use it, those static files can be css files, images, videos and other files.

**Express Static Middleware:**

- `express.static` is a built-in middleware function in Express.js.
- It's used to serve static files like HTML, CSS, images, and client-side JavaScript to web clients (usually web browsers).
- Static files are files that don't change often and are the same for all users (e.g., your website's logo, styles, or JavaScript files).

**How it Works:**

- When you use `express.static`, you provide a folder path where your static files are located.
- Express will automatically look for files in that folder when a request is made for a specific URL.
- If a file with a matching name is found, Express sends that file to the client.

**Example:**

Imagine you have a folder called "public" that contains your website's CSS, images, and JavaScript files. You can use `express.static` to serve these files to clients:

```javascript
app.use(express.static('public'));
//or
app.use(express.static(path.join(__dirname, 'public')));
```

- Now, when someone visits your website, if they request a file like `styles.css` in their browser, Express will automatically find and send the `styles.css` file from the "public" folder.

**Benefits:**

- Using `express.static` makes it easier to serve your static files without writing individual route handlers.
- It improves performance by allowing browsers to cache static files, reducing the need to repeatedly request the same files.
- It's a common practice for delivering resources that don't change often.

**Important Note:**

- Be cautious when using `express.static` to serve sensitive files, as they will be accessible to anyone who knows the file's URL. Avoid serving confidential data this way.

In simple terms, `express.static` is like a waiter at a restaurant who brings you specific dishes from the kitchen (your static files) without you having to request each dish separately. It's a convenient way to deliver resources to web clients while focusing on building other dynamic parts of your website using Express.js.