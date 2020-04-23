//keyword schema

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	//스키마 정의
	var CameraSchema = mongoose.Schema({
        id : {type:String},
        time : {type:String},
	cnt : {type:String}
    });
	return CameraSchema;
};

// module.exports에 ReservationSchema 객체 직접 할당
module.exports = Schema;

