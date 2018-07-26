module.exports = function(express){
    var route = express.Router();
    var Language = {};    
    var language = require('../models/language');    

    Language.getlanguages = function(req,res){
        
        try{
            language.find({}, function(err, languages) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        message: "Table error",
                        "data": err
                    })
                }else{                    
                    res.send({
                        success: true,
                        message: "",
                        data: languages
                    });
                }              
               
            });           

        }catch(err){
            res.status(500).send({
                "status": "error",
                message: "Error On Method Calling",
                "data": err
            })
           
        }
    }

    
    Language.savelanguage = function(req,res){
        
        try{
            var newlanguage = language({
                name: req.body.name
             });                          
              newlanguage.save(function(err,lan) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        "message": err                      
                    })
                }else{
                   
                    res.send({
                        "success": true,
                        "message": "",
                        "data":lan                       
                    });
                } 
            });     
                

        }catch(err){
            res.status(500).send({
                "status": "error",
                "message": "Error On Method Calling",
                "data": err
            })
           
        }
    }

    language.search = (req, res) => {
        var query = {};
        query.name = { "$regex": req.params.name, "$options": "i" }
        languagemodels.find(query, function (err, result) {
            if (err) throw err;
            res.send(result);
        });
    }

    Language.searchlanguage = function(req,res){    
        try{
            
            var query = {};
            query.name = { "$regex": req.query.name, "$options": "i" }                  
            language.find(query, function(err, languages) {
                if(err){
                    res.status(500).send({
                        "status": "error",
                        message: "Table error",
                        "data": err
                    })
                }else{                    
                    res.send({
                        success: true,
                        message: "",
                        data: languages
                    });
                }              
               
            });           

        }catch(err){
            res.status(500).send({
                "status": "error",
                message: "Error On Method Calling",
                "data": err
            })
           
        }
    }   
    
    route.get('/list',Language.getlanguages);    
    route.post('/save',Language.savelanguage);
    route.get('/search',Language.searchlanguage);
    return route;
}