/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.3
 * @date 2016-01-16
 */

var	sqlite3 = require('sqlite3').verbose(),
		$util = require('../util/util'),
		DBname = require('../DB/DBConfig').name;



var $sql = {
		insert : 'INSERT INTO user(account,password,whenIn) VALUES(?,?,?)',
		update : 'UPDATE user SET password = ? WHERE account = ?',
		delete : 'DELETE FROM user WHERE account = ? and password = ?',
		queryById : 'SELECT * FROM user WHERE account = ?',
		queryAll : 'select * FROM user'
};

var debug = true;

module.exports = {
	// 登陆
  login: function (req, res, next) {
	  // get param
	  var param = req.body;
    // get DB connection
		var db = new sqlite3.Database(DBname);
		db.get($sql.queryById, [param.account], function (err, row){
			if(err){
				console.log(err);
				result = {
					code : -100,
					msg : '服务器繁忙'
				}
				$util.jsonWrite(res, result);
			}
			if(!!row) {
				// 查询有返回
				debug ? console.log('[login sqlite3]:',row) : console.log('');
				var result;
				if (row.password === param.password) {
					// 密码正确
					result = {
						code : 1,
						msg : '登陆成功'
					}
					res.cookie('account', row.account, { expires: new Date(Date.now() + 15*60*1000)});
					res.cookie('awId', row.whenIn, { expires: new Date(Date.now() + 15*60*1000)});
				} else {
					// 密码错误
					result = {
						code : 0,
						msg : '密码错误'
					}
				}
				$util.jsonWrite(res, result);
			} else {
				var result = {
					 code : 0,
					 msg : '不存在此账号'
				}
				$util.jsonWrite(res, result);
			}
			db.close();
		});
	},
	//注册用户
  signup : function (req, res, next) {
			debug ? console.log('[signup]:call') : {};
			// get param
			var param = req.body;
			// get DB connection
			var db = new sqlite3.Database(DBname);
			var result;
			db.get($sql.queryById, [param.account], function (err, row) {
				if(err) {
					console.log(err);
					result = {
						code : -100,
						msg : '服务器繁忙'
					}
					$util.jsonWrite(res, result);
				}
				if(!!row) {
					// 查询有返回
					debug ? console.log('[signup sqlite3]:', row) : console.log('');
					// 该账号已被注册
					result = {
						code : -2,
						msg : '账号已被注册'
					}
					$util.jsonWrite(res, result);
					db.close();
				} else {
					debug ? console.log('账号未被注册') : {};
					// 该账号未被注册
					var now = new Date().getTime();
					db.run($sql.insert, [param.account, param.password, now], function (err, row) {
						if(err){
							result = {
								code : -100,
								msg : '数据库错误'
							}
							db.close();
						} else {
							debug ? console.log('[login sqlite3]:执行INSERT') : console.log('');
							result = {
								code : 1,
								msg : '操作成功'
							}
							res.cookie('account', param.account, { expires: new Date(Date.now() + 15*60*1000)});
							res.cookie('awId', now, { expires: new Date(Date.now() + 15*60*1000)});
							$util.jsonWrite(res, result);
							db.close();
						}
					});
				}
			});
		},
  checkLogin : function (req, res, next) {
		 // get cookies
		 var param = req.cookies;
		 // get DB connection
     var db = new sqlite3.Database(DBname);
		 var result;
 		 db.get($sql.queryById, [param.account], function (err, row){
	 			if(err){
	 				console.log(err);
					result = {
						code : -100,
						msg : '服务器繁忙'
					}
					$util.jsonWrite(res, result);
	 			}
	 			if(!!row) {
	 				// 查询有返回
	 				debug ? console.log('[checkLogin sqlite3]:',row) : console.log('');
	 				if (row.whenIn === param.awId) {
	 					// 密码正确
	 					result = {
	 						code : 1,
	 						msg : '允许登录'
	 					}
	 					res.cookie('account', row.account, { expires: new Date(Date.now() + 15*60*1000)});
	 					res.cookie('awId', row.whenIn, { expires: new Date(Date.now() + 15*60*1000)});
	 				} else {
	 					// 密码错误
	 					result = {
	 						code : 0,
	 						msg : 'token fail to login'
	 					}
	 				}
	 				$util.jsonWrite(res, result);
	 			} else {
	 				var result = {
	 					 code : 0,
	 					 msg : 'token fail to login'
	 				}
	 				$util.jsonWrite(res, result);
	 			}
	 			db.close();
	 		});

	}
}
