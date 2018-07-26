'use strict';

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var mongoDB = 'mongodb://127.0.0.1/Tutorial';
mongoose.connect(mongoDB);

// mongoose.connect("mongodb://127.0.0.1:27017/Tutorial",{ useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection err'));
db.once('open', () => {
	console.log("Database connected...");
	// console.log(db);
});

module.exports = db;