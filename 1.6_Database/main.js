//CJS
const { faker } = require('@faker-js/faker');



// It Will Return a object of fake user data.
/*
let createRandomUser = ()=>{
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}
*/
// console.log(createRandomUser());


//Insert In Bulk in DataBase
let createRandomUser = ()=>{
    return [
      faker.string.uuid(),
      faker.internet.userName(),
      faker.internet.email(),
      faker.internet.password(),
    ];
  }

let data = [];
for(let i=0;i<5;i++){
    data.push(createRandomUser());
}




// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: "ajay",
});


let q = "SHOW TABLES";

try {
    // simple query
    connection.query(q,(err, results, fields) => {
            if (err) throw err;
            console.log(results); // results contains rows returned by server
            console.log(results.length);
            console.log(results[0]);
            //   console.log(fields); // fields contains extra meta data about results, if available
        }
    );
} catch (err) {
    console.log(err);
}


//Insertion using placeholder yani ak tarhe se variables hai ye ? jo replace ho jayege jo hum array dege baad mein uski values k sath

// let query = "INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)";
// let user1 = ["211006","Ajay Mahiwal","ajay@gmail.com","123456"];

//Multiple users data insertion
/**
 
let query = "INSERT INTO user (id, username, email, password) VALUES ?";
let users = [ ["2110346","Singh6776","singh879@gmail.com","7642967834"], 
              ["2110079","Raj8787","raj698@gmail.com","2374928632"]];

connection.query(query,[users],(err, results, fields) => {
    console.log(results); // results contains rows returned by server
    console.log("Insertion Completed - Ajay Mahiwal");
}
);

 */


let query = "INSERT INTO user (id, username, email, password) VALUES ?";
connection.query(query,[data],(err, results, fields) => {
    console.log(results); // After insertion it will print some information about insertion
    console.log("Insertion In Bulk Is Completed.");
}
);



connection.end();