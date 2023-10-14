
## Best practices for REST API design 
<br>
📖📚Read About [API DESIGN](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)🚀    <br>



**Array find Function:**
The `find` method is a built-in JavaScript array method that allows you to search for the first element in an array that satisfies a provided condition. It's a powerful tool for searching through arrays of data. Let's break down how the `find` method works and provide some examples:

**Syntax:**
```javascript
array.find(callback(element[, index[, array]])[, thisArg])
```

- `array`: The array you want to search through.
- `callback`: A function that defines the condition for the search. It takes up to three arguments:
  - `element`: The current element being processed in the array.
  - `index` (optional): The index of the current element.
  - `array` (optional): The array being processed.
- `thisArg` (optional): A value to use as `this` when executing the callback function.

**Return Value:**
The `find` method returns the first element in the array that satisfies the provided condition. If no element satisfies the condition, it returns `undefined`.

Now, let's see some examples:

**Example 1: Finding an Object in an Array**
```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

const targetUser = users.find(user => user.id === 2);
console.log(targetUser); // { id: 2, name: 'Bob' }
```

In this example, we have an array of user objects, and we're using `find` to search for the user with `id` equal to 2. It returns the first user that satisfies the condition.

**Example 2: Finding the First Odd Number in an Array**
```javascript
const numbers = [2, 4, 7, 8, 10, 11];

const firstOddNumber = numbers.find(num => num % 2 !== 0);
console.log(firstOddNumber); // 7
```

Here, we're using `find` to find the first odd number in an array of integers.

**Example 3: Using `thisArg`**
```javascript
const fruits = ['apple', 'banana', 'cherry'];

function findFruit(fruit) {
  return this === fruit;
}

const banana = fruits.find(findFruit, 'banana');
console.log(banana); // 'banana'
```

In this example, we're searching for the fruit "banana" using the `findFruit` function. We specify the `thisArg` parameter as 'banana' to set the context (`this`) inside the callback.

Remember that the `find` method stops as soon as it finds the first element that satisfies the condition. If you need to find all elements that match a condition, you might want to consider using `filter` instead.



## Why we are using method-overidding package ?   <br> 

👀 [method-overriding package](https://www.npmjs.com/package/method-override) <br>
**Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.**
In forms or client side is not able to use method other than get or post But we have to use in our project where we want to edit or delete something.
for that facilty we use it, using this package POST request method we can override into other method like PUT, PATCH, DELETE etc.
