module.exports = function(express){
    var route = express.Router();
    var Course = {};    
    var course = require('../models/courseType');    

    Course.getcourses = function(req,res){
        
        try{
            course.find({}, function(err, courses) {
                if(err){
                    res.status(500).send({
                        "status": "error",                        
                        "data": err
                    })
                }else{                    
                    res.send({
                        success: true,                        
                        data: courses
                    });
                }              
               
            });           

        }catch(err){
            res.status(500).send({
                "status": "error",                
                "data": err
            })
           
        }
    }

    
    Course.savecourse = function(req,res){
        
        try{
            var newcourse = course({
                type: req.body.type
             });                          
              newcourse.save(function(err,course) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        "message": err                      
                    })
                }else{
                   
                    res.send({
                        "success": true,
                        "message": "",
                        "data":course                       
                    });
                } 
            });     
                

        }catch(err){
            res.status(500).send({
                "status": "error",                
                "data": err
            })
           
        }
    }
   
    
    route.get('/list',Course.getcourses);    
    route.post('/save',Course.savecourse);
    return route;
}