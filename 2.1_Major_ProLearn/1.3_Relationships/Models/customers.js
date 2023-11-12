

const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/relationships';


async function main(){
    await mongoose.connect(MONGO_URL);
}

main()
.then(()=>{
    console.log("Connected With DB.");
})
.catch((err)=>{
    console.log(err);
});

// Order Schema & Model
const orderSchema = mongoose.Schema({
    item:String,
    price:Number,
});

const Order = mongoose.model("order",orderSchema);


// Customer Schema & Model
const customerSchema = mongoose.Schema({
    name:String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"order",
        },
    ],
});

const Customer = mongoose.model("Customer",customerSchema);


const addOrders = async ()=>{
    let res = await Order.insertMany([
        {item:"Orange",price:6},
        {item:"Banana",price:5},
        {item:"Apple",price:7},
    ]);

    console.log(res);
}

// addOrders();

const addCustomer = async()=>{
    let cust1 = new Customer({
        name:"RajMahiwal",
    });

    let ord1 = await Order.findOne({ item:"Apple" });
    let ord2 = await Order.findOne({ item:"Orange" });

    cust1.orders.push(ord1);
    cust1.orders.push(ord2);

    let res = await cust1.save();
    console.log(res);
}

// addCustomer();

const findCustomer = async()=>{
    let res = await Customer.find({}).populate("orders");
    console.log(res);
    console.log(res[0]);
}
findCustomer();