const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const path = require("path");

require("./db/conn");
const Register = require("./models/Registers");

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

//const static_path = path.join(__dirname + "/");

//app.use(express.static(static_path));
//console.log(path.join(__dirname));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.get("/success", function(req, res){
  res.sendFile(__dirname + "/success.html");
});

//Sending Data to Mongo DB
app.post("/Registers", function (req, res) {
  console.log(req.body)
    const registerEmployee = new Register({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email
    }).save();
    res.status(201).redirect('/success');

});

app.listen(3000, function(){
  console.log("server is running on port 3000.");
});


//13c2b0d213be1429afddd64019ed7f72-us13
