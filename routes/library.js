var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library');
var db = mongoose.connection;

db.on('error', function(msg){
	console.log("Mongoose: Unable to connect to database");
});

db.once('open', function(){
	console.log("Mongoose connected to library datatbase.");
});

var Books = require('../models/library');

router.get('/books/list', function(req, res){
	Books.find({}).exec(function(err, books){
		if(err){
			console.log("Error getting books from library");
		} else {
			res.json(books);
		}
	});
});

router.post('/books/add', function(req, res){

	var book = new Books(req.body);
	book.save(function(err, results){
		if(err){ 
			console.log(req.body);
			res.status(404);
		} else {
			res.status(201).send('Book Added');
		}
	});
});

module.exports = router;