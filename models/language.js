'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var languageSchema = new Schema({
		name: String			
	});
	var language = mongoose.model('language', languageSchema);
module.exports = language;