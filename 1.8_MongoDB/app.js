// getting-started.js
const mongoose = require('mongoose');

main()
.then((data)=>{
    console.log("Connection Established.");
})
.catch((err) =>{
    console.log(err)
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/college');
}

// Collection k liye, Yani ak trhe se table ki columns
const studentSchema = new mongoose.Schema({
    name:String,
    rollno:Number,
    email:String,
    courseDetails:{
        course:String,
        sem:Number,
        cgpa:Number,
    },
});


const Student = mongoose.model("Student",studentSchema);

/**
 const stu1 = new Student({
    name:"Ajay",rollno:5,email:"ajay@gmail.com",
    courseDetails:{course:"BCA",sem:5,cgpa:7.96}
});

stu1.save();
 */


const teacherSchema = new mongoose.Schema({
    name:String,
    email:String,
    salary:Number,
    teachingDetails:{
        exp:Number,
        subject:String,
    },
});

const Teacher = new mongoose.model("Teacher",teacherSchema);

/**
 const teacher1 = new Teacher({
    name:"Kavita Bisnoii",email:"kavita@gmail.com",
    teachingDetails:{exp:5,subject:"C language"},
});

teacher1.save();
 */