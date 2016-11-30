// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/students');

var Student     = require('./student.js');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
//
// on routes that end in /students
// ----------------------------------------------------
router.route('/students')

    // create a student (accessed at POST http://localhost:8080/api/students)
    .post(function(req, res) {
        
        var student = new Student();      // create a new instance of the student model
        student.Student_Number = req.body.Student_Number;  // set the students name (comes from the request)
        console.log(student.Student_Number);
        student.First_Name = req.body.First_Name;
        console.log(student.First_Name);
        student.Last_Name = req.body.Last_Name;
        console.log(student.Last_Name);
        student.Dob = req.body.Dob;
        console.log(student.Dob);
        student.Residency = req.body.Residency;
        console.log(student.Residency);
        student.Gender = req.body.Gender;
        console.log(student.Gender);

        // save the student and check for errors
        student.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'student created!' });
        });
        
    })
    
        // get all the students (accessed at GET http://localhost:8080/api/students)
    .get(function(req, res) {
        Student.find(function(err, students) {
            if (err)
                return res.send(err);

            res.json(students);
            
        });
        console.log('Received a GET!');
    })
    
    //delete all students
    .delete(function(req, res) {
        Student.remove({
            __v: 0
        }, function(err, student) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted all' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', express.static('webApp/src'));
app.use('/assets', express.static('webApp/src/assets'));

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Port ' + port + ' is magical!');