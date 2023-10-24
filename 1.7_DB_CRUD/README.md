
# CRUD Opertions In DB

**All Process Done By Me In This 1.7_DB_CRUD Given Below:**

npm i express
npm i uuid
npm i mysql2

Created `app.js` File and All basic Js Code


npm i ejs
mkdir views
mkdir public

npm i method-override (It will Help to make routes like PATCH, PUT, DELETE etc.)


Created Connection with database Using Basic mysql2 package code
& Then 

So Write These Commands In new Terminal To Use DATABASE From CL:
1. `    cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"    `
2. `    .\mysql -u root -p  `

3. `    use university_app;  `
4. `    source E:\1LEARN HERE\#1 Course Videos\DELTA\Code\Backend\1.7_DB_CRUD\schema.sql   `

Using schema.sql i created a table user in That DB.

**Added Some Fake Data In university_app DataBASE So I Can Use that Data In This Project.**
npm i @faker-js/faker and used some basic code to use it And After insertion i removed that code from app.js because no use later of that code.


```javascript

const { faker } = require('@faker-js/faker');

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
for(let i=0;i<100;i++){
    data.push(createRandomUser());
}


//DATA Adding Into DB
let query = "INSERT INTO user (id, username, email, password) VALUES ?";
try{
connection.query(query,[data],(err, results, fields) => {
    if (err) throw err;
    console.log(results); // After insertion it will print some information about insertion
    console.log("Insertion In Bulk Is Completed.");
}
);
}
catch(err){
        console.log(err);
    }
```
