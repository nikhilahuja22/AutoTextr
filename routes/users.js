var express = require('express');
var router = express.Router();
var mongodb  = require("mongodb");
//var bodyParser = require('body-parser');

//Bring models
let User = require('../app/models/user');



//Mongoose imports
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/users');
let db = mongoose.connection;


db.once('open', function(){
  console.log('Connection to mongodb');
})

db.on('error', function(err){
  console.log(err);
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  // Mongo without using Mongoose
  // var MongoClient = mongodb.MongoClient;

  // var url = 'mongodb://localhost:27017/users'

  // MongoClient.connect(url, function(err, db){
  //   if(err){
  //     console.log('Unable to connect to the server');
  //   } else{
  //     console.log("Connection established");

  //     var collection = db.collection('users');

  //     collection.find({}).toArray(function(err, result){
  //       if (err) {
  //         res.send(err);
  //       } else if (result) {
  //         res.send(result);
  //       } else {
  //         res.send("No docs found");
  //       }
  //     });
  //   }
  // });

  //res.send('respond with a resource');
  res.render('users', {'title' : 'User page'});
});


router.post('/add', function(req, res){
  let newUser = new User();

  newUser.first_name = req.body.firstName;
  newUser.last_name = req.body.lastName;

  console.log('req %j', req.body);
  console.log('Submitted user');

  newUser.save(function(err){
    if(err) {
      res.send(err);
    } else {
      res.send('Sucess');
    }
  });
});

router.get('/mongoose', function(req, res) {
  User.find({}, function(err, users) {
    if(err) {
      console.log(err);
    } else {
      res.send(users);
    }
  });
});

module.exports = router;
