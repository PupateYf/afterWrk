/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.2
 * @date 2016-01-16
 */
var mysql = require('mysql'),
	$conf = require('../conf/DBConfig'),
	$util = require('../util/util'),
	$sql  = require('./userSqlMapping')

//mysql connect pool
var pool = mysql.createPool($util.extend({}, $conf.mysql));



module.exports = {

	//新增用户for test
	login : function (req, res, next) {
		pool.getConnection(function (err, connection) {
			//get param
			var param = req.body;
			connection.query($sql.queryById,[param.id, param.password], function (err, result) {
				if(result) {
					var result = result[0];
					if(result) {
						if(result.password == param.password)
						result = {
							status : 1,
							msg : '操作成功'
						}
					}
					$util.jsonWrite(res, result);
				}
				connection.release();
			});
		});
	},
	//注册用户
	signup : function (req, res, next) {
		pool.getConnection(function (err, connection) {
			//get param
			var param = req.body;
			connection.query($sql.queryById, [param.id], function (err, result) {
				if(result[0]) {
					//该账号已被注册
					result = {
						status : -2,
						msg : '账号已被注册'
					}
					$util.jsonWrite(res, result);
					connection.release();
				} else {
					//get time and set cookie
					var now = new Date().getTime();
					connection.query($sql.insert, [param.id, param.password,now], function (err, result) {
						if(result) {
							result = {
								status : 1,
								msg : "操作成功"
							}
							res.cookie('id', param.id, { expires: new Date(Date.now() + 15*60*1000)});
							res.cookie('awId', now, { expires: new Date(Date.now() + 15*60*1000)});
     							// res.redirect("/workspace");
						}
						$util.jsonWrite(res, result);
						connection.release();
					})
				}
			});
		});
	}
}