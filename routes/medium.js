module.exports = function(express){
    var route = express.Router();
    var Medium = {};    
    var medium = require('../models/medium');    

    Medium.getmediums = function(req,res){
        
        try{
            medium.find({}, function(err, mediums) {
                if(err){
                    res.status(500).send({
                        "status": "error",                        
                        "data": err
                    })
                }else{                    
                    res.send({
                        success: true,                        
                        data: mediums
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

    
    Medium.savemedium = function(req,res){
        
        try{
            var newmedium = medium({
                medium: req.body.medium
             });                          
              newmedium.save(function(err,medium) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        "message": err                      
                    })
                }else{
                   
                    res.send({
                        "success": true,                        
                        "data":medium                       
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
   
    
    route.get('/list',Medium.getmediums);    
    route.post('/save',Medium.savemedium);
    return route;
}