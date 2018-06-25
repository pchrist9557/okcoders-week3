var mongoose = require('mongoose');

var schema = mongoose.Schema({
	title: String,
	author: String,
	status: String
});

var Books = mongoose.model('books', schema);

module.exports = Books;