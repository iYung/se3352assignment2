var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentSchema   = new Schema({
  Student_Number: Number,
  First_Name: String,
  Last_Name: String,
  Dob : Date,         // Date of birth of student    
  Residency: String, //use drop down meny to select value
  Gender: String // use drop down meny to select value
});

module.exports = mongoose.model('Student', StudentSchema);