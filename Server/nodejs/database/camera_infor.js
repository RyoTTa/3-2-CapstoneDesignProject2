//camera_infor

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	//스키마 정의
	var CameraSchema = mongoose.Schema({
		id : {type:String, unique:true},
		latitude : {type:String},
		longitude : {type:String},
    });
	return CameraSchema;
};


module.exports = Schema;

