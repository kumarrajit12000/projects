const mongoose = require("mongoose");
const initdata = require("./data.js");
const hotelinfo = require("../models/hotelinfo.js");

// connect to db
main()
.then(()=> {
    console.log("connected to db sucessfully");
})
.catch((err)=> {
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/HotelForTravel");
}

const initdb = async ()=> {
    await hotelinfo.deleteMany({});
    await hotelinfo.insertMany(initdata.data);
    console.log("data sucessfully inserted");
};
initdb();