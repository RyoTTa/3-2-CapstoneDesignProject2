
/*
 * ?�정
 */

module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
		{file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'},
		{file:'./camera_schema',collection:'cameras',schemaName:'CameraSchema',modelName:'CameraModel'}
	],
	route_info: [
	],
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	}
}
