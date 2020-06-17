
  
module.exports = function(router, passport,app) {
    console.log('user_passport 호출됨.');

    // 로그인 화면
    router.route('/login').get(function(req, res) {
        console.log('/login 패스 요청됨.');
        var id = req.query.id;
        var pw = req.query.pw;
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        var database = req.app.get('database');
	    database.UserModel.findOne({ 'id' :  id }, function(err, user) {
	    	if (err) { return done(err); }

	    	// 등록된 사용자가 없는 경우
	    	if (!user) {
	    		console.log('계정이 일치하지 않음.');
	    		res.send('계정이 일치하지 않음.');
	    	}
	    	else{
                // 비밀번호 비교하여 맞지 않는 경우
                if(pw != user.password)
                {
                    console.log('비밀번호 일치하지 않음.');
                    res.send('비밀번호 일치하지 않음.');
                }
                else{
                    console.log('계정과 비밀번호가 일치함.');
                    res.send('success');
                }
            }
	    });
    });
	 
    // 회원가입 화면
    router.route('/signup').get(function(req, res) {
        console.log('/signup 패스 요청됨.');
        var id = req.query.id;
        var pw = req.query.pw;
        var name = req.query.name;
        var database = req.app.get('database');
        res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        database.UserModel.findOne({ 'id' :  id }, function(err, user) {
            // 에러 발생 시
            if (err) {
                return done(err);
            }
            
            // 기존에 사용자 정보가 있는 경우
            if (user) {
                console.log('기존에 계정이 있음.');
                res.send('기존에 계정이 있음.');
            } else {
                // 모델 인스턴스 객체 만들어 저장
                var user = new database.UserModel({'id':id, 'password':pw, 'name':name});
                user.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    
                    console.log("사용자 데이터 추가함.");
                    res.send('success');
                });
            }
        });    
    });

};