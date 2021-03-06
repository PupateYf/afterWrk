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
		formidable = require('formidable'),
		UPLOAD_DIR = 'public/upload/user/',
		fs = require('fs'),
		md5 = require('md5');

var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;
var todoScheme = new Schema({
    account    : {type : String},
    userImg    : {type : String},
    userName   : {type : String},
    birthday   : {type : Number},
    inersting  : {type : String},
    location   : {type : String},
    description: {type : String},
    gender     : {type : Number},
})

var User = mongodb.mongoose.model('user',todoScheme);
var userDao = function(){};
userDao.prototype.save = function(obj, callback, res) {
    var instance = new User(obj);
    var result;
    instance.save(function(err){
        if(err) {
            console.log(err);
            callback(res, result)
        } else {
            console.log('save successfully');
            var result = {
                code : 1,
                data : obj,
                msg : '录入成功'
            }
            res.cookie('userName', obj.userName, { expires: new Date(Date.now() + 15*60*1000)});
            res.cookie('userImg', obj.userImg, { expires: new Date(Date.now() + 15*60*1000)});
            callback(res, result);
        }
    });
};

userDao.prototype.find = function (conditions, fields, options, callback, res) {
		var result;
		User.find(conditions, fields, options, function(err, obj) {
				if(err) {
						console.log(err);
						callback(res, result);
				} else {
						console.log('find successfully');
						var result = {
								code : 1,
								data : obj,
								msg : '查询成功'
						}
						callback(res, result);
				}
		})
}

userDao.prototype.findOne = function(conditions, fields, options, callback, res) {
    var result;
    User.findOne(conditions, fields, options, function(err, obj){
        if(err) {
            console.log(err);
            callback(res, result);
        } else {
            console.log('find successfully');
            console.log(obj);
            var result = {
                code : 1,
                data : obj,
                msg : '查询成功'
            }
            res.cookie('userName', obj.userName, { expires: new Date(Date.now() + 15*60*1000)});
            res.cookie('userImg', obj.userImg, { expires: new Date(Date.now() + 15*60*1000)});
            callback(res, result);
        }
    });
}
userDao.prototype.update = function(conditions, set, callback, res, appendData) {
    var result;
    var dbSet = {$set : set};
    User.update(conditions, dbSet, function(err, count){
        if(err) {
            console.log(err);
            callback(res, result);
        } else {
            console.log('update successfully in',count);
            var result = {
                code : 1,
                msg : '修改成功',
								data : appendData || null
            }
            callback(res, result);
        }
    });
}
userDao.prototype.remove = function(conditions, callback, res) {
    var result;
    User.remove(conditions, function (error){
        if(error) {
           console.log(error);
           callback(res, result);
        } else {
            console.log('active remove successfully');
            var result = {
                code : 1,
                msg : '删除成功'
            }
            callback(res, result);
        }
    })
}

var $sql = {
		insert : 'INSERT INTO user(account,password,whenIn) VALUES(?,?,?)',
		update : 'UPDATE user SET password = ? WHERE account = ?',
		delete : 'DELETE FROM user WHERE account = ?',
		queryById : 'SELECT * FROM user WHERE account = ?',
		queryAll : 'select * FROM user'
};

var debug = false;

module.exports = {
	// 登陆
  login: function (req, res, next) {
	  // get param
	  var that = this;
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
					that.findUserDetail(row.account,res)
				} else {
					// 密码错误
					result = {
						code : 0,
						msg : '密码错误'
					}
					$util.jsonWrite(res, result);
				}
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
			var that = this;
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
					$util.jsonWrite(res, result);
				} else {
					debug ? console.log('[login sqlite3]:执行INSERT') : console.log('');
					result = {
						code : 1,
						msg : '操作成功'
					}
					res.cookie('account', param.account, { expires: new Date(Date.now() + 15*60*1000)});
					res.cookie('awId', now, { expires: new Date(Date.now() + 15*60*1000)});
					that.initUserDetail(param.account,res)
				}
				db.close();
			});
		},
	// 通过cookie判断是否已经登陆
  checkLogin : function (req, res, next) {
		 var that = this;
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
	 				if (parseInt(row.whenIn) === parseInt(param.awId)) {
	 					// 密码正确
	 					result = {
	 						code : 1,
	 						msg : '允许登录'
	 					}
	 					res.cookie('account', row.account, { expires: new Date(Date.now() + 15*60*1000)});
	 					res.cookie('awId', row.whenIn, { expires: new Date(Date.now() + 15*60*1000)});
	 					that.findUserDetail(row.account,res)
	 				} else {
	 					// 密码错误
	 					result = {
	 						code : 0,
	 						msg : 'token fail to login'
	 					}
	 					$util.jsonWrite(res, result);
	 				}
	 			} else {
	 				var result = {
	 					 code : 0,
	 					 msg : 'token fail to login'
	 				}
	 				$util.jsonWrite(res, result);
	 			}
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
				console.log('注册验证码是',ramdonCode);
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
	},// End of getValidCode
	initUserDetail : function(account, res){
		var todoObj = {
			    account    : account,
			    userImg    : 'default.png',
			    userName   : md5(account).toString().substr(0,7),
			    birthday   : '',
			    inersting  : '',
			    location   : '',
			    description: '',
			    gender     : 0,
		}
		var User = new userDao();
		User.save(todoObj, $util.jsonWrite, res);
	},
	findUserDetail : function(account, res){
		var conditions = {
			account : account.toString()
		}
		var fields = null,
			options = {}
		var User = new userDao();
		User.findOne(conditions, fields, options, $util.jsonWrite, res)
	},
	updateUserDetail : function(req, res, next) {
		var User = new userDao();
		var request = req.body;
		var conditions = request.conditions,
				set = request.set;
		User.update(conditions, set, $util.jsonWrite, res);
	},
	updateUserImg : function(req, res, next) {
		console.log('[post]:upload method call');
		var quene = new formidable.IncomingForm();
				quene.encoding = 'utf-8';
				quene.uploadDir = UPLOAD_DIR;
				quene.keepExtensions = true;
				quene.maxFieldsSize = 5*1024*1024;
				quene.parse(req, function (err, fields, files) {
					if (err) {
						res.locals.error = err;
						return;
					}
					var extName = '',temp = '',filePath = '',fileName = '';
					//获取类型
					for(item in files){
						if(files[item].hasOwnProperty('type')){
							temp = files[item].type;
							fileName = files[item].name;
							filePath = files[item].path;
							break;
						}
					}
					//判断图像类型
					switch (temp) {
						case 'image/pjpeg':
							extName = 'jpg';
							break;
						case 'image/jpeg':
							extName = 'jpg';
							break;
						case 'image/png':
							extName = 'png';
							break;
						case 'image/x-png':
							extName = 'png';
							break;
						case 'image/bmp':
							extName = 'bmp';
							break;
						case 'image/gif':
							extName = 'gif';
							break;
					}
					//非图像
					if(extName.length == 0){
						res.console.error('only img');
						//fail
						res.json({
								'code' : -1,
								'msg'    : 'The upload file with an error format'
						})
						return;
					}
					//success
					//重命名
					var newName = fileName +'.'+extName,
					    newPath = quene.uploadDir + newName;
					fs.renameSync(filePath, newPath);
					//写数据库
					var User = new userDao();
					var conditions = {account : req.cookies.account},
							set = {userImg : newName};

					User.update(conditions, set, $util.jsonWrite, res, newName);
		});
	},
	loadUser : function(req, res, next) {
		console.log('[post]:load user call');
		var request = req.body;
		var conditions = request.conditions,
				fields = request.fields,
				options = request.options;
		var User = new userDao();
		User.find(conditions, fields, options, $util.jsonWrite, res);
	},
	removeUser : function (req, res, next) {
		var param = req.body;
		var db = new sqlite3.Database(DBname);
		var result;
		db.run($sql.delete, [param.account], function (err, row) {
			if(err){
					result = {
						code : -100,
						msg : '数据库错误'
					}
					$util.jsonWrite(res, result);
					return;
			} else {
					debug ? console.log('[remove sqlite3]:执行INSERT') : console.log('');
			}
			db.close();
		});
		var User = new userDao();
		User.remove(param.conditions, $util.jsonWrite, res);
	}
}
