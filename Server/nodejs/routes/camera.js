var ObjectId = require('mongodb').ObjectId;

module.exports = function(router,app) {
    console.log('camera router call');
    router.route('/camera_insert').post(function(req,res){
        console.log('camera data input');
        var database = app.get('database');
        var data = new database.CameraModel({
            'id' : req.body.id,
            'time' : req.body.time,
            'cnt' : req.body.cnt
        });
        data.save(function(err){
            if (err) {
                res.send('false');
                throw err;
            }
            console.log('insert complete');
            res.send('true');
            });
        });
    };
