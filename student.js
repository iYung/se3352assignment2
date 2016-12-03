var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StudentSchema   = new Schema({
  number: Number,
  firstName: String,
  lastName: String,
  DOB : Date,         // Date of birth of student    
  residency: String, //use drop down meny to select value
  gender: String // use drop down meny to select value
});

module.exports = mongoose.model('Student', StudentSchema);