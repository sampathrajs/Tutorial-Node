module.exports=function(express){
    var route = express.Router();
    var Course = {};
    var multer  = require('multer')
    let upload  = multer({ storage: multer.memoryStorage() });
    var file=require('../models/file');


    Course.single=function(req,res){     
        
/* req.body=>  you can get form field values then where you want use this 
 console.log(req.body) */

        var newFile=file({
            image: req.file.buffer,
            contentType: req.file.mimetype,
            filename: req.file.originalname            
        });       
        newFile.save((err,formdata)=>{
            if(err){
                res.send({
                    "status":"Error",
                    "Error":err
                })
            }else{
                res.send({
                    "status":"Success",
                    "data":formdata
                })
            }
        })
   
    }
    Course.multiple=function(req,res){
        /* req.body=>  you can get form field values then where you want use this 
 console.log(req.body) */
        
        var images=[];        
        req.files.forEach(function(data){
        var newFile=file({
                    image: data.buffer,
                    contentType: data.mimetype,
                    filename: data.originalname
                });               
                images.push(newFile);
        })       
        file.collection.insert(images,(err,result)=>{
            if(err){
                res.send({
                    "status":"Error",
                    "Error":err
                })
            }else{
                res.send({
                    "Status":"Success",
                    "Data":result
                })
            }
        })       
       
        }

        Course.fetch=function(req,res){            
           file.findOne(req.query,function(err,result){
               if(err){
                   res.send({
                       "status": "Error",
                       "Error" : err
                   })
               }else{
                res.send({
                    "status": "Success",
                    "Data" : result
                })
               }
           })
            }
    route.post('/single', upload.single('file'),Course.single);
    route.post('/multiple', upload.array('file'),Course.multiple);
    route.get('/fetch',Course.fetch);
    return route;
}