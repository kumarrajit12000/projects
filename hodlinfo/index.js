const express = require("express");
const mysql2 = require("mysql2");
// const mongoose = require("mongoose");
const app = express();
const path =require("path");
const JSDOM = require("jsdom");

let port = 8080;
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended : true}));


//connect to mysql......    
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database : 'hodlinfo',
    password : 'Rajit@123',
});
 
const url = "https://api.wazirx.com/api/v2/tickers";


//data store in database
const getdata = () => {
	fetch(url)
		.then(response => response.json())
		.then(response => {
			const alldata = Object.values(response);
            for(let i=0; i<10; i++){
                const data = alldata[i];
                let q = `INSERT INTO coininfo (coin_name,live,buy,sell,last_trade,volumn,base_unit) VALUES ('${data.name}',${data.open},${data.buy},${data.sell},${data.last},${data.volume},'${data.base_unit}')`;
                        try{
                            connection.query(q, (err,result) => {
                                if(err)  throw err;
                                console.log(result);
                           });
                        }
                        catch (err) {
                            console.log("db error");
                        }

            }
		})
		.catch(err => console.log(err));
}
// getdata();

// route to display data on frontend from database
app.get("/",(req,res) => {

    let q = `SELECT * FROM coininfo`;
    try{
        connection.query(q, (err,result) => {
            if(err)  throw err;

            res.render("index.ejs",{result});
       });
    }
    catch (err) {
        console.log("db error");
    }
 });

app.listen(port,() => {
    console.log("app is listening on port 8080");
});