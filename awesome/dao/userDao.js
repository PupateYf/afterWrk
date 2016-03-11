/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.3
 * @date 2016-01-16
 */

var	sqlite3 = require('sqlite3').verbose(),
		$util = require('../util/util'),
		DBname = require('../DB/DBConfig').name,
		Alidayu = require('alidayujs'),
		md5 = require('md5');


var $sql = {
		insert : 'INSERT INTO user(account,password,whenIn) VALUES(?,?,?)',
		update : 'UPDATE user SET password = ? WHERE account = ?',
		delete : 'DELETE FROM user WHERE account = ? and password = ?',
		queryById : 'SELECT * FROM user WHERE account = ?',
		queryAll : 'select * FROM user'
};

var debug = false;

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
				if (row.password === md5(param.password)) {
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
			var validCode = req.cookies.validCode;
			// 比对验证码
			if(md5(param.validCode) !== validCode) {
				result = {
					code : 0,
					msg : '验证码错误'
				}
				$util.jsonWrite(res, result);
				return;
			}
			// get DB connection
			var db = new sqlite3.Database(DBname);
			var result;
			var now = new Date().getTime();
			db.run($sql.insert, [param.account, md5(param.password), now], function (err, row) {
				if(err){
					result = {
						code : -100,
						msg : '数据库错误'
					}
				} else {
					debug ? console.log('[login sqlite3]:执行INSERT') : console.log('');
					result = {
						code : 1,
						msg : '操作成功'
					}
					res.cookie('account', param.account, { expires: new Date(Date.now() + 15*60*1000)});
					res.cookie('awId', now, { expires: new Date(Date.now() + 15*60*1000)});
				}
				db.close();
				$util.jsonWrite(res, result);
			});
		},
	// 通过cookie判断是否已经登陆
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
	},
	// 获取验证码
	getValidCode : function (req, res, next) {
		var param = req.body;
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
				return; // 退出当前函数
			} else {
				debug ? console.log('账号未被注册') : {};
				// 该账号未被注册 允许发送验证码
				var config = {
						app_key: '23317675',
						secret: '850a9493c7aa141871699f32f03023b8'
				};
				var alidayu = new Alidayu(config);
				var ramdonCode = $util.createRamdon();
				var options = {
						sms_free_sign_name: '注册验证',
						sms_param: {
							code: ramdonCode,
							product: '【下班后beta】内测',
						},
						rec_num: param.account, // 手机号码
						sms_template_code: 'SMS_5245254',
				};
				//发送短信
				alidayu.sms(options,function(data){
						var json = JSON.parse(data);
						console.log(data);
						if(json.hasOwnProperty("alibaba_aliqin_fc_sms_num_send_response")){
							 if(json["alibaba_aliqin_fc_sms_num_send_response"].result.success){
								 // 成功
								var result = {
									 code : 1,
									 msg : 'valid code request successfully'
								}
								// 验证码1分钟有效
								res.cookie('validCode', md5(ramdonCode), { expires: new Date(Date.now() + 10*60*1000)});
								$util.jsonWrite(res, result);
							 }
						} else {
							var result = {
								 code : 0,
								 msg : 'valid code request fail'
							}
							$util.jsonWrite(res, result);
						}
				});
			}
		});

	}// End of getValidCode
}
