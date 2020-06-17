
var crypto = require('crypto');

var Schema = {};

Schema.createSchema = function(mongoose) {
	
	// 스키마 정의
	var UserSchema = mongoose.Schema({
		id: {type: String, 'default':''}
	    , password: {type: String, required: true, 'default':''}
	    , name: {type: String, index: 'hashed', 'default':''}
	});
	console.log('UserSchema 정의함.');

	return UserSchema;
};

// module.exports에 UserSchema 객체 직접 할당
module.exports = Schema;

