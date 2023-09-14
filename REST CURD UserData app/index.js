const {faker} = require("@faker-js/faker");
const mysql2 = require("mysql2");
const express = require("express");
const app = express();
let port  = 8080;
const uuid = require("uuid");
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.resolve('./public')));
app.use(express.static("views"));

//connect to mysql......    
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database : 'userdata',
    password : 'Rajit@123',
    multipleStatements : true
});
 
    // fack data

// let users = [["1234","rajitk","kumarrajit@12345","rajit@12345"],
//             ["123456","rajitkp","kumarrajit@12345678","rajit@12345678"]
//         ];

        // let getRandomUser = () => {
        //     return [
        //        faker.datatype.uuid(),
        //         faker.internet.userName(),
        //         faker.internet.email(),
        //        faker.internet.password(),
        //     ];
        // };

// let data = [];
// for(let i=1; i<=100; i++){
//     data.push(getRandomUser());
// }        

//query.....
// let q = "INSERT INTO DATA ( id,username,email,password) VALUES ?";
// let q2 = "SELECT * FROM DATA";
// try{
//     connection.query(q2, (err,result) => {
//         if(err)  throw err;
//         console.log(result);
//    });
// }
// catch (err) {
//     console.log(err);
// }

app.get("/users",(req,res,next) => {

//     let q1 = "SELECT COUNT(*) FROM DATA";
// try{
//     connection.query(q1, (err,result1) => {
//         if(err)  throw err;
//          let count = result1[0]['COUNT(*)'];
//         res.render("users.ejs",{count});
//    });
// }
// catch (err) {
//     console.log("db error");
// }

    let q = ["SELECT COUNT(*) FROM DATA","SELECT id,username,email FROM DATA"];
    try{
        connection.query(q.join(';'), (err,result) => {
            if(err)  throw err;
            console.log(result);
           let count = result[0][0]['COUNT(*)'];
           
           res.render("users.ejs",{count,result});
          
       });
    }
    catch (err) {
        console.log("db error");
    }
    
    });

//edit route

 app.get("/user/:id/edit",(req,res) => {

        let {id} = req.params;
        let q = `SELECT * FROM DATA where id ='${id}'`;
        try{
            connection.query(q, (err,result) => {
                if(err)  throw err;
                let user = result[0];
                res.render("edit.ejs",{user});
           });
        }
        catch (err) {
            console.log("db error");
        }
 });

 //update route

 app.patch("/user/:id",(req,res) => {
    
    let {id} = req.params;
    let {username : formuser ,password: formpass} = req.body;

    let q = `SELECT * FROM DATA where id ='${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err)  throw err;
            let user = result[0];
            
            if(formpass != user.password){
                res.send("Wrong password");
            }
            else {
                let q = `UPDATE data SET username ='${formuser}' WHERE id='${id}'`;
                connection.query(q,(err,result) => {
                    if(err) throw err;
                    res.redirect("/users");
                });
            }
       });
    }
    catch (err) {
        console.log("db error");
    }
});

//render delete.ejs 
app.get("/user/:id/delete",(req,res) => {

    let {id} = req.params;
    let q = `SELECT * FROM DATA where id ='${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err)  throw err;
            let user = result[0];
            res.render("delete.ejs",{user});
       });
    }
    catch (err) {
        console.log("db error");
    }
});

//DELETE Route
app.delete("/user/:id/delete",(req,res) => {
   
    let {id} = req.params;
    let {email : formemail , password: formpass} = req.body;

    let q = `SELECT * FROM DATA where id ='${id}'`;
    try{
        connection.query(q, (err,result) => {
            if(err)  throw err;
            let user = result[0];
            
            if(formpass != user.password || formemail != user.email){
                res.send("Wrong password");
            }
            else {
                let q = `DELETE  FROM DATA where id ='${id}'`;
                connection.query(q,(err,result) => {
                    if(err) throw err;
                    res.redirect("/users");
                });
            }
       });
    }
    catch (err) {
        console.log("db error");
    }
});

//register route

app.get("/register",(req,res) => {  
      
     res.render("register.ejs");  
 });

 //registerform route 

 app.post("/registerform",(req,res) => {

    let {id,username,email,password} = req.body;

    let q = `INSERT into  DATA VALUES('${id}','${username}','${email}','${password}')`;
    try{
        connection.query(q, (err,result) => {
            if(err)  throw err;
            res.redirect("/users");
       });
    }
    catch (err) { 
        console.log("db error");
    }
});

 app.get("/showUsers",(req,res) => {      
    res.redirect("/users");
});

//search
app.get("/search",(req,res) => {      
    res.render("search.ejs");
});

app.post("/searchUser",(req,res) => {      
   let {id} = req.body;
   let q = `SELECT * FROM DATA where id ='${id}'`;
   try{
       connection.query(q, (err,result) => {
           if(err)  throw err;
           let user = result[0];
           res.render("showUser.ejs",{user});
      });
   }
   catch (err) {
       console.log("db error");
   }
});

app.listen("8080", () => {
    console.log("app is listening");
});


