

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


// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("I'm Pre Middleware Of mongoose.");
// });
customerSchema.post("findOneAndDelete", async(customerData)=>{
    console.log("I'm Post Middleware Of mongoose.");

    if(customerData.orders.length){
        let res = await Order.deleteMany({ _id: {$in: customerData.orders}});
        console.log("Order Deleted Result",res);
    }
});

const Order = mongoose.model("order",orderSchema);
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
        name:"Anand Kumar",
        // name:"RajMahiwal",
    });

    let ord1 = await Order.findOne({ item:"Paneer" });
    let ord2 = await Order.findOne({ item:"Protein" });

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
// findCustomer();



const addCustomerAndOrder = async()=>{
    let custo = new Customer({
        name:"Anand Kumar",
    });

    let ord1 = new Order({
        item:"Paneer",
        price:80,
    });
    let ord2 = new Order({
        item:"Protein",
        price:100,
    });

    custo.orders.push(ord1);
    custo.orders.push(ord2);

    await ord1.save();
    await ord2.save();
    await custo.save();
}

// addCustomerAndOrder();

const deleCust = async()=>{
    let data = await Customer.findByIdAndDelete("655179c59777e4e65d655299");
    console.log("Deleted Customer" , data);
}

// deleCust();