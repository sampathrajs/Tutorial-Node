'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
	var fileSchema = new Schema({      

image: {
    type: Buffer         
  },
  contentType: {
      type:String
  },
  filename:{type:String}                   	
       
	});
	var file = mongoose.model('file', fileSchema);
module.exports = file;

// image:{ data: Buffer, contentType: String ,filename:String}    