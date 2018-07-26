'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var tutorialSchema = new Schema({
       title: {
        type: String,        
        required: true,
        trim: true		
       },
       description: {
        type: String,        
        required: true,
        trim: true		
       },
       tutorialLink: {
        type: String,        
        required: true,
        trim: true		
       },
       language: {
        type: String,        
        required: true,
        trim: true		
       },
       courseType: {
        type: String,        
        required: true,
        trim: true		
       },
       level: {
        type: String,        
        required: true,
        trim: true		
       },
       medium: {
        type: String,        
        required: true,
        trim: true		
       },
       version: {
        type: String,        
        required: true,
        trim: true		
       },
	});
	var tutorial = mongoose.model('tutorial', tutorialSchema);
module.exports = tutorial;