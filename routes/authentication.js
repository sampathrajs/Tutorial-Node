module.exports = function(express){
    var route = express.Router();
    var User = {};    
    var user=require('../models/user');    
    var bcrypt = require('bcrypt');

    User.signin=function(req,res,next){
      
        if (req.body.email &&
          req.body.username &&
          req.body.password ) {
      
          var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,            
          }
      
          user.create(userData, function (error, user) {
            if (error) {
               res.status(500).send({
                "status": "error",
                message: "user creation error",
                "data": error
            })
            } else {
              res.send({
                "status": "Success",
                message: "user creation successfull",
                "data": user
            })
            }
          });
      
        } else if (req.body.email && req.body.password) {            

            user.findOne({ email: req.body.email })
            .exec(function (err, user) {
              if (err) {
                var err = new Error('User not found.');
                err.status = 401;
                  res.send({
                      "status":"error",
                      "data":err
                  })
               
              } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                res.send({
                    "status":"error",
                    "data":err
                })
              }
              bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (result === true) {
                  res.send({
                      "status":"success",
                      "message":"login successfull",
                      "data":result
                  })
                } else {
                    res.send({
                        "status":"error",
                        "message":"login unsuccessfull",
                        "data":user
                    })
                }
              })
            });        
        } else {
          var err = new Error('All fields required.');
          err.status = 400;
          res.send({
            "status": "error",                
            "data": err
          })
        }
    }    
    
    route.post('/signin',User.signin);        
    return route;
}