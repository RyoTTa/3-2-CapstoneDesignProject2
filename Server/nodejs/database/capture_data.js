//capture

var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	//?�키�??�의
	var CaptureSchema = mongoose.Schema({
        id : {type:String},
        time : {type:String},
        count : {type:Number},
        img_name : {type:String}
    });
	return CaptureSchema;
};

module.exports = Schema;

