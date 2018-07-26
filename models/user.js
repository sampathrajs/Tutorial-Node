'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema; 
	var userSchema = new Schema({
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
          username: {
            type: String,
            unique: true,
            required: true,
            trim: true
          },
          password: {
            type: String,
            required: true,
          }		
    });
    userSchema.pre('save', function (next) {
        var user = this;        
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        })
      });


	var user = mongoose.model('user', userSchema);
module.exports = user;