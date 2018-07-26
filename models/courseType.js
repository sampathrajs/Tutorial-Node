'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var courseSchema = new Schema({
		type: String			
	});
	var course = mongoose.model('course', courseSchema);
module.exports = course;