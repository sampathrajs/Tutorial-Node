'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var mediumSchema = new Schema({
		medium: String			
	});
	var medium = mongoose.model('medium', mediumSchema);
module.exports = medium;