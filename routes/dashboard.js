var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

let Order = require('../app/models/order');

mongoose.connect('mongodb://localhost:27017/users');
let db = mongoose.connection;


db.once('open', function(){
  console.log('Connection to mongodb');
})

db.on('error', function(err){
  console.log(err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
	Order.find({}, function(err, orders) {
		if (err) {
			console.log(err);
		}
	  res.render('dashboard', { 
	  	title: 'Express',
	  	orders: orders
	   });		
	});


});

module.exports = router;