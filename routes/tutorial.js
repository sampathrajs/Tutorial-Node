module.exports = function (express) {
    var route = express.Router();
    var async = require("async");
    var Tutorial = {};
    var medium = require('../models/medium');
    var language = require('../models/language');
    var courseType = require('../models/courseType');
    var level = require('../models/level');
    var tutorial = require('../models/tutorial');


    var dropdowns = {};

    task = [
        function (callback) {
            medium.find({}, function (err, mediums) {
                if (err) {
                    callback({
                        "status": "error",
                        "data": err
                    })
                } else {
                    dropdowns.mediums = mediums;
                    callback();
                }

            });
        },
        function (callback) {
            courseType.find({}, function (err, courseTypes) {
                if (err) {
                    callback({
                        "status": "error",
                        "data": err
                    })
                } else {
                    dropdowns.courseTypes = courseTypes;
                    callback();
                }

            });
        },
        function (callback) {
            language.find({}, function (err, languages) {
                if (err) {
                    callback({
                        "status": "error",
                        "data": err
                    })
                } else {
                    dropdowns.languages = languages;
                    callback();
                }

            });
        },
        function (callback) {
            level.find({}, function (err, levels) {
                if (err) {
                    callback({
                        "status": "error",
                        "data": err
                    })
                } else {
                    dropdowns.levels = levels;
                    callback();
                }

            });
        }
    ];

    Tutorial.fetch = function (req, res) {
        try {
            async.parallel(task, function (err) {
                if (err) {
                    res.send({
                        "status": "error",
                        "data": err
                    })
                } else {
                    res.send({
                        "success": true,
                        "data": dropdowns
                    });
                }
            });

        } catch (err) {
            res.status(500).send({
                "status": "error",
                "data": err
            })

        }
    }
    Tutorial.save = function (req, res) {
        try {
            var newtutorial = tutorial({
                title: req.body.title,
                description: req.body.description,
                tutorialLink: req.body.tutorialLink,
                language: req.body.language,
                courseType: req.body.courseType,
                level: req.body.level,
                medium: req.body.medium,
                version: req.body.version
            });
            newtutorial.save(function (err, tutorial) {
                if (err) {
                    res.send({
                        "status": "error",
                        "message": err
                    })
                } else {

                    res.send({
                        "success": true,
                        "data": tutorial
                    });
                }
            });

        } catch (err) {
            res.status(500).send({
                "status": "error",
                "data": err
            })

        }
    }
    Tutorial.filter=function(req,res){
        try{

            var query = {};
            if(req.query.courseType){
                query.courseType =  {$in: req.query.courseType.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
            }
            if(req.query.medium){
                query.medium =  {$in: req.query.medium.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
            }

            if(req.query.level){
                query.level =  {$in: req.query.level.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
            }

            if(req.query.version){
                query.version =  {$in: req.query.version.split(',').map((o)=>{return mongoose.Types.ObjectId(o)})}
            }

            tutorial.find(query).then((err,tutorials)=>{
                if(err){
                    res.send({
                        "status": "error",
                        "message": err
                    })
                }else{
                    res.send({
                        "success": true,
                        "data": tutorials
                    });
                }
            })


        }catch (err){
            res.status(500).send({
                "status": "error",
                "data": err
            })
        }
    }


    route.get('/list', Tutorial.fetch);
    route.post('/save', Tutorial.save);
    route.get('/search',Tutorial.filter)
    return route;
}