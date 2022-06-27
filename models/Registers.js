const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

  firstName : {
    type : String,
    required : false
  },
  lastName : {
    type : String,
    required : false
  },
  email : {
    type : String,
    required : false,
    unique : true
  }
});

const Register = new mongoose.model("Registers", employeeSchema);

module.exports = Register;
