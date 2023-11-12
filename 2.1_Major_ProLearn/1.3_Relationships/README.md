

📖Read [6 Rules of Thumb for MongoDB Schema Design](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design) <br>

📖Read [populate() method](https://mongoosejs.com/docs/populate.html) <br>

# populate() Method of mongoose
**Hme us reference id yani ObjectId ka kuch nhi kerna hota hme kabhi bhi jab actual data chaiye tab ise use kerte hai method ko. In short, ObjectId's ki jghe per actual information aa jaye gi ager ye method use kiya to**


```javascript
const findCustomer = async()=>{
    let res = await Customer.find({}).populate("orders");
    console.log(res);
    console.log(res[0]);
}
findCustomer();
```


# Result Before Using populate()

```javascript
[
  {
    _id: new ObjectId("65504ff18fa5102d08037cb9"),
    name: 'RajMahiwal',
    orders: [
      new ObjectId("65504c7eaa3bac013dc6f815"),
      new ObjectId("65504c7eaa3bac013dc6f813")
    ],
    __v: 0
  }
]
```

# Result After Using populate()

```javascript
[
  {
    _id: new ObjectId("65504ff18fa5102d08037cb9"),
    name: 'RajMahiwal',
    orders: [ [Object], [Object] ],
    __v: 0
  }
]
```