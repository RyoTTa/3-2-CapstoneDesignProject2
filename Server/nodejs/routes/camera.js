var ObjectId = require('mongodb').ObjectId;

var fs = require('fs');
const { doesNotMatch } = require('assert');

module.exports = function(router,app) {
    console.log('camera router call');


    router.route('/capture_insert').post(function(req,res){
        console.log('captrue data input');
        var database = app.get('database');
        var moment = require('moment'); 
        require('moment-timezone'); 
        moment.tz.setDefault("Asia/Seoul"); 
        var date = moment().format('YYYY-MM-DD HH:mm:ss'); 
        var data = new database.CaptureModel({
            'id' : req.body.id,
            'count' : req.body.count,
            'time' : date,
            'img_name' : req.files.file.name
        });
        fs.writeFile('./img/'+req.files.file.name,req.files.file.data,function(err){
            if(err)
                throw err;
            console.log('write end');
            data.save(function(err){
                if (err) {
                    res.send('false');
                    throw err;
                }
                console.log('insert complete');
                res.send('true');
            });
        });
    });
	router.route('/capture_log').get(function(req,res){
        console.log('send capture log');
        var cam_id = req.query.cam_id;
		var database= app.get('database');
		database.CaptureModel.find({'id':cam_id},function(err,data){
             res.header("Access-Control-Allow-Origin","*");
              res.header("Access-Control-Allow-Headers", "X-Requested-With");
              res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            res.send(data);
		});
    });
    router.route('/camera_add').get(function(req,res){
        console.log('camera_add');
        var id = req.query.id;
        var longitude = req.query.longitude;
        var latitude = req.query.latitude;
        var database = app.get('database');
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        database.CameraModel.findOne({'id': id},function(err,cam){
            if(err){
                return done(err);
            }
            if(cam){
                console.log('id가 중복입니다.');
                res.send('id가 중복입니다.');
            } else{
                var data = new database.CameraModel({'id':id,'latitude':latitude,'longitude':longitude});
                data.save(function(err){
                    if(err){
                        throw err;
                    }
                    console.log('data 추가 성공');
                    res.send('success');
                });
            }
        });
    });
    router.route('/camera_delete').get(function(req,res){
        console.log('camera_delete');
        var id = req.query.id;
        console.log(id);
        var database = app.get('database');
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        database.CameraModel.findOne({'id': id},function(err,cam){
            if(err){
                return done(err);
            }
            console.log(cam);
            if(cam){
                database.CameraModel.remove({'id': id},function(err){
                    if(err)
                    {
                        throw err;
                    }
                    else{
                        console.log('삭제완료');
                        res.send('success');
                    }
                });
                
            } else{
                console.log('해당 id 에 맞는 camera가 없습니다.');
                res.send('해당 id 에 맞는 camera가 없습니다.');
            }
        });
    });
    router.route('/camera_list').get(function(req,res){
        console.log('send camera list ');
        var database = app.get('database');
        database.CameraModel.find({},function(err,data){
            res.header("Access-Control-Allow-Origin","*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
          res.send(data);
        });
    });
   router.route('/request_img').get(function(req,res){
    console.log('request img');
    var img_name = req.query.img_name;
    //var img_name = '0011590042071.1495068.jpg';
    console.log(img_name);
    var filepath = './img/'+img_name;
    console.log(filepath);
    fs.readFile(filepath,function(err,data){
        res.writeHead(200,{"Context-Type":"image/jpg"});
        res.write(data);
        res.end();
    })
});
   
   
};
