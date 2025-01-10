let sum = (...numbers) => ( 
    numbers.reduce((prev, current)=> prev + current, 0)
);

// array.reduce(function(accumulator, currentValue, currentIndex, array) {
//     // Return the new accumulator value
// }, initialValue);

console.log(sum(234,343,1,66,56));



exports.message1 = "hello";
exports.message2 = "hello";  


module.exports = { sum };  
