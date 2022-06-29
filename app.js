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

app.get("/login", function(req, res){
  res.sendFile(__dirname + "/login.html");
});

//Sending Data to Mongo DB
app.post("/Registers", function (req, res) {
  //console.log(req.body)
    const registerEmployee = new Register({
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      email : req.body.email
    }).save();
    res.status(201).redirect('/success');

});

app.post("/login", async (req, res) =>{
  const email = req.body.email;
  const firstName = req.body.firstName;

  try{
    const useremail =await Register.findOne({email});

    if(useremail.firstName === firstName) {
      res.status(201).send("<h1>Welcome! You are logged in</h1>");
    }else{

      res.send("<h1>invalid login</h1>");
      /*app.get("/login", function(req, res){
        res.sendFile(__dirname + "/login.html");
      });*/
      //res.redirect("/login");
      //alert("invailid");

    }

    //≡
    //res.send(useremail);
    //console.log(email);
  } catch (error) {
    res.status(400).send("invalid login");
  }

});

/*let url = request.url;
if (url==="login"){
  fs.readFile(path.join(__dirname + "/login.html"), function (req, res)  {


  });
}*/

app.listen(3000, function(){
  console.log("server is running on port 3000.");
});


//13c2b0d213be1429afddd64019ed7f72-us13
