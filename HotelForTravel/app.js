const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const hotelinfo = require("./models/hotelinfo.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")))

// connect to db
main().then(()=> {
    console.log("connected to db sucessfully");
})
.catch((err)=> {
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/HotelForTravel");
};

//index route
app.get("/hotelinfo", async (req,res)=> {
    const allinfo = await hotelinfo.find({});
    res.render("index.ejs",{allinfo});
})

//new route
app.get("/hotelinfo/new",(req,res)=> {
    res.render("new.ejs");
})

//create route
app.post("/hotelinfo/create", async (req,res)=> {
    const newhotelinfo = new hotelinfo(req.body.hotelinfo);
   await newhotelinfo.save();
   res.redirect("/hotelinfo");
})

//edit route
app.get("/hotelinfo/:id/edit", async (req,res)=> {
    let {id} = req.params;
    const info = await hotelinfo.findById(id);
    res.render("edit.ejs",{info});
})

//update route
app.put("/hotelinfo/:id/update", async (req,res)=> {
    let {id} = req.params;
    const info = await hotelinfo.findByIdAndUpdate(id,{...req.body.hotelinfo});
    res.redirect("/hotelinfo");
})

//delete route
app.delete("/hotelinfo/:id/delete", async (req,res)=> {
    let {id} = req.params;
    const info = await hotelinfo.findByIdAndDelete(id);
    res.redirect("/hotelinfo");
})
//show route
app.get("/hotelinfo/:id", async (req,res)=> {
    let {id} = req.params;
    const info = await hotelinfo.findById(id);
    res.render("show.ejs",{info});
})

app.use((err,req,res,next) => {
    console.log("__----error_----");
});
app.listen(8080,()=> {
    console.log("app is listening on port 8080");
});

