module.exports = function(express){
    var route = express.Router();
    var Level = {};    
    var level = require('../models/level');    

    Level.getlevels = function(req,res){
        
        try{
            level.find({}, function(err, levels) {
                if(err){
                    res.status(500).send({
                        "status": "error",                        
                        "data": err
                    })
                }else{                    
                    res.send({
                        success: true,                        
                        data: levels
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

    
    Level.savelevel = function(req,res){
        
        try{
            var newlevel = level({
                level: req.body.level
             });                          
              newlevel.save(function(err,level) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        "message": err                      
                    })
                }else{
                   
                    res.send({
                        "success": true,                        
                        "data":level                       
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
   
    
    route.get('/list',Level.getlevels);    
    route.post('/save',Level.savelevel);
    return route;
}