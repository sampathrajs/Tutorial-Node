'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var levelSchema = new Schema({
		level: String			
	});
	var level = mongoose.model('level', levelSchema);
module.exports = level;