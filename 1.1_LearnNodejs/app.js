console.log("I'm Ajay Mahiwal.");
console.log("Date 21-08-2023");

console.log(process.argv);

// const user = require("./userInfo");
// console.log(user);
// user.changeEmailID();
// user.changeProfilePhoto();
// user.changeUserName()
// console.log(user.sum(10,20));
// user.changePassword(10,20)
// user.changeUserName();

// import { money } from "./userInfo.js";
// console.log("user moneyinfo:",money)

const fruitsData= require("./Fruit");

console.log(fruitsData);
console.log(fruitsData.apple);
// console.log(fruitsData[0].name);


/**
 
 */

//Figlet use kerna (Exports in Dir's vala concept lga liya)
const figlet = require("./figletDir");
figlet("Ajay Mahiwal", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});   