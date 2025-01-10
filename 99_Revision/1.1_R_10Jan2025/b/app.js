let myModule = require("./math");

// sum(23)
// console.log(math.message);

console.log(myModule.message1);  // "undefined"
console.log(myModule.message2);  // "undefined"

// becase module.exports overwrites the exports.nameOfAny property if want to use those use only one way

// Accessing and using the sum function
console.log(myModule.sum(2, 3));  // 5

const utils = require("./utils");

console.log(utils);


/*

700
undefined
undefined
5
{ red: 'Red' } { yellow: 'Yellow' } Green
{ red: { red: 'Red' }, yellow: { yellow: 'Yellow' }, green: 'Green' }

*/