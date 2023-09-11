
// In this everytime when i am saying this is not good way to create objects, its mean many objects (1000+ or more) not just 5 or 10.


//Simple Way to Create Objects (But Inefficient)
//One by one we creating objects
//This is also a not good way to create objects :
// 1. Memory inefficient (every object will have own diffrent copy in memory.)
// 2. Have to write objects properties and more from scratch Everytime
// 3. No blueprint exits we write every propery everytime in all objects.

const stu1 = {
    name:"Ajay",
    class:"BCA",
    sem:5,
    marks:80,
    doSomeThing:()=>{
        console.log("I Love to teach about coding.");
    }
}
const stu2 = {
    name:"Gargi",
    class:"BCA",
    sem:5,
    marks:80,
    doSomeThing:()=>{
        console.log("I Love to Think new Ideas.");
    }
}
const stu3 = {
    name:"Aman",
    class:"BCA",
    sem:5,
    marks:80,
    doSomeThing:()=>{
        console.log("I can do anything.");
    }
}
console.log(stu1);
console.log(stu2);
console.log(stu3);
console.log("stu1.doSomeThing===stu2.doSomeThing Will be:",stu1.doSomeThing===stu2.doSomeThing); //false




//Prototype Object: Every Object in JS has a built-in property which is called its prototype.
// In prototype object, all common properties exits of anykind of object it can be Array or String Etc.
const student = {};
// /*
const stu11 = {
    stuName:"Ajay",
    // class:"BCA",
    // sem:5,
    marks:80,
}
const stu21 = {
    stuName:"Gargi",
    // class:"BCA",
    // sem:5,
    marks:90,
}
const stu31 = {
    stuName:"Aman",
    // class:"BCA",
    // sem:5,
    marks:80,
}
// */

//These properties now stored in Prototype Obj, Now no need to store these all in every single object one by one and now objects also will not create its own copy and it will save memory also but i think not safe because anyone can see object prototype properties in chrome insepect mode.
//This is also a not good way to create objects:
// 1. Security issue
// 2. Memory inefficient
// 3. No blueprint exits we write every propery everytime in all objects.
student.__proto__.class="BCA";
student.__proto__.sem=5;
student.__proto__.talk=function(){
    console.log(`${this.name} is Taking.`);
};
console.log(student);
console.log(stu11);
console.log(stu21);
console.log("stu11.talk===stu21.talk Will be:",stu11.talk===stu21.talk); //true
/*
const stu11={};
const stu21={};
const stu31={};

stu11.stuName="Ajay";
stu11.marks=80;
stu21.stuName="Gargi";
stu21.marks=90;
stu31.stuName="Aman";
stu31.marks=80;
*/





// Factory Function : A function that creates Objects.
//This is also not good way to create objects because every object have a diffrent copy in memory, which is inefficient way.
function studentMaker(name,age,course,rollno) {
    const student = {
        name : name,
        age : age,
        course : course,
        rollno : rollno,
        talk(){
            console.log(`Hii, I am ${this.name}.`);
        },
    }
    return student;
}

const stu_1 = studentMaker("Ajay",20,"BCA",211020);
const stu_2 = studentMaker("Gargi",20,"BCA",211040);
const stu_3 = studentMaker("Aman",30,"BCA",211050);

console.log(studentMaker);
console.log(stu_1);
console.log(stu_2);
console.log(stu_3);
console.log("stu_1.talk===stu_2.talk Will be:",stu_1.talk===stu_2.talk); //false
console.log("stu_2.talk===stu_3.talk Will be:",stu_2.talk===stu_3.talk); //false





//Constructor Function
//It will not return anything (only ref. address returns of newInstance) and function name will start with Capital letter.
//We are using it like a blueprint which will help to make objects,and we are using new keyword with it.

// When a function is called with the new keyword, the function will be used as a constructor. new will do the following things :
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new


function Person(name,age,profession){
    this.name = name;
    this.age = age;
    this.profession = profession;
    temp = 10; 
    // this temp=10 will not become part of objects, only where this used that will be part of object and those who is defined in constructor function prototype
}

Person.prototype.talk = function(){
    console.log(`Hii, I am ${this.name}.`);
}
Person.prototype.hands = 2;
Person.prototype.eyes = 2;
Person.prototype.ears = 2;
Person.prototype.legs = 2;

let p1 = new Person("Ajay",20,"SDE");
let p2 = new Person("Gargi",10,"Doctor");

console.log(Person);
console.log(p1);
console.log(p2);
console.log("p1.hands===p2.hands Will be:",p1.talk===p2.talk); //true
console.log("p1.talk===p2.talk Will be:",p1.talk===p2.talk); //true
//Extra copies will not created by this way. Those properties which is defined in constructor function prototype will stored at once and all objects will point them or use them and will not any copy for them.






// Classes
//This is also efficient way to create objects like constructor function, using classes object will not create extra copy for properties for ex. talk,smile function and all properties which are present in class body.
//Classes are best way to create objects as comapared to constructor function because here we don't have to define common properties for all objects in any constructor function prototype. We Just Write all of those in class body.
//Jse new keyword constructor function mein object create ker rha tha 4 steps mein yha bhi ase hi create kerta hai vo

class People{
    country = "India";
    state = "Haryana";
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hii, I am ${this.name}.`);
    }
    smile(){
        console.log(`${this.name} is Happy!`);
    }
}

let pp1 = new People("Kalu",25);
let pp2 = new People("Chotu",15);

console.log(People);
console.log(pp1);
console.log(pp2);
console.log("pp1.country===pp2.country Will be:",pp1.country===pp2.country);  //true
console.log("pp1.talk===pp2.talk Will be:",pp1.talk===pp2.talk);  //true





// Inheritance

class PersonInfo{
    constructor(name,age){
        console.log("Parent Constructor Called!");
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`${this.name} is Talking.`);
    }
    run(){
        console.log(`${this.name} can run.`);
    }
}

class Students extends PersonInfo{
    constructor(name,age,course,rollno){
        console.log("Stdudents Constructor Called!");
        super(name,age);
        this.course = course;
        this.rollno = rollno;
    }
}

class Teacher extends PersonInfo{
    constructor(name,age,salary){
        console.log("Teacher Constructor Called!");
        super(name,age);
        this.salary = salary;
    }
}

let t1 = new Teacher("Surender",35,30000);
let s1 = new Students("Ajay",20,"BCA",211020);

console.log(t1);
console.log(s1);

console.log(t1.talk===s1.talk); //true