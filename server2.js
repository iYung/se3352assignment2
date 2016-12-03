// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = 3000;        // set our port

var mongoose   = require('mongoose');
var db
mongoose.connect('mongodb://localhost:27017/students')
MongoClient.connect('mongodb://localhost:27017/students', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

var Student     = require('./student.js');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

//GET--------------------------------------------------------------------------
router.route('/students')
    .get(function(req, res) {
       Student.find(function(err, chords) {
            if (err)
                return res.send(err);
            res.json(chords);
        });
        console.log('Received a GET!');
    });
    
router.route('/find/:num')
    .get(function(req, res) {
        Student.find({
            number: req.params.num
        },function(err, chords) {
            if (err)
                return res.send(err);

            res.json(chords);
            
        });
        console.log('Received a GET!');
    });
    
router.route('/students/first')
    .get(function(req, res) {
       Student.find(function(err, chords) {
            if (err)
                return res.send(err);
            res.json(chords);
        }).sort({_id:1}).limit(1);
        console.log('Received a GET!');
    });

router.route('/students/last')
    .get(function(req, res) {
       Student.find(function(err, chords) {
            if (err)
                return res.send(err);
            res.json(chords);
        }).sort({_id:-1}).limit(1);
        console.log('Received a GET!');
    });

router.route('/students/next/:id')
    .get((req, res) => {
        myCursor = db.collection('students').find({_id: req.params.id}).toArray()
        console.log('Received a Next!');
    });
router.route('/students/previous/:id')
    .get((req, res) => {
        var myCursor = Student.find({_id: req.params.id}).sort({_id:-1})
        if (myCursor.hasNext()){
            res.json(myCursor.next())
        }
    console.log('Received a GET!');
});

//PUT FUNC---------------------------------------------------------
    
router.route('/update/:id')

    .put(function(req, res) {
        // use our chord model to find the chord we want
        Student.findById(req.params.id, function(err, chord) {
            if (err)
                return res.send(err);
            console.log("---------------------------------");
            chord.number = req.params.number;
            console.log("Num -> " + chord.number);
            chord.firstName = req.params.firstName;
            console.log("Num -> " + chord.firstName);
            chord.DOB = req.params.DOB;
            console.log("Num -> " + chord.DOB);
            chord.residency = req.params.residency;
            console.log("Num -> " + chord.residency);
            chord.gender = req.params.gender;
            console.log("Num -> " + chord.gender);
            // save the chord
            chord.save(function(err) {
                if (err)
                    return res.send(err);
                console.log("Post success!");
                console.log(" ");
                res.json({ message: 'New Like!' });
            });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
//app.listen(port);
console.log('Port ' + port + ' is magical!');