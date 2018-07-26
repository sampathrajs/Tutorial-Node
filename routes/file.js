module.exports=function(express){
    var route = express.Router();
    var Course = {};
    var multer  = require('multer')
    let upload  = multer({ storage: multer.memoryStorage() });
    Course.single=function(req,res){
    res.send({
        "formname":req.body,
        "file":req.file
    })
    }
    Course.multiple=function(req,res){
        res.send({
            "formname":req.body,
            "file":req.files
        })
        }
    route.post('/single', upload.single('file'),Course.single);
    route.post('/multiple', upload.array('file'),Course.multiple);
    return route;
}