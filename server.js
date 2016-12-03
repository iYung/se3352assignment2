console.log('May Node be with you')

const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser');
var router = express.Router();
var Student = require('./student.js');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db
MongoClient.connect('mongodb://localhost:27017/students', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
});

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
})


.get('/find/:number',function(req, res) {
  
    console.log(req.param('number'))
    db.collection('students').findById({_id: req.param('number')}).toArray((err, result) =>{
      res.json(result)
    })
})

.delete('/students',(req, res) => {
        db.collection('students').remove({
            __v: 0
        }, function(err, student) {
            if (err)
                return res.send(err);

            res.json({ message: 'Successfully deleted all' });
        });
    })


.get('/students',(req, res) => {
  db.collection('students').find().toArray((err, result) => {
    res.json(result)
  })
    console.log('Received a GET!');
})

.get('/students/first',(req, res) => {
  db.collection('students').find().sort({_id:1}).limit(1).toArray((err, result) => {
    res.json(result)
  })
    console.log('Received a GET!');
})

.get('/students/last',(req, res) => {
  db.collection('students').find().sort({_id:-1}).limit(1).toArray((err, result) => {
    res.json(result)
  })
    console.log('Received a GET!');
})

.get('/students/next',(req, res) => {
    var id= req.param('id');
    db.collection('students').find({_id: id}).toArray((err, result) => {
        res.json(result)
  })
    console.log('Received a GET!');
})


.post('/students', (req, res) => {
  db.collection('students').save(req.body, (err, result) => {
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
        if (err){
            return res.send(err);
        }
        res.json({ message: 'student created!' });
    });
  })
})

.put('/students/:id',(req, res) => {

        // use our student model to find the student we want
        Student.findById(req.params.id, function(err, student) {

        if (err)
            return res.send(err);

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

        // save the student
        student.save(function(err) {
            if (err)
                return res.send(err);

            res.json({ message: 'Student updated!' });
        });

    });
})

    .get('/chords',function(req, res) {
       Student.find(function(err, chords) {
            if (err)
                return res.send(err);

            res.json(chords);
            
        });
        console.log('Received a GET!');
    });


app.use('/api', router);