/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.2
 * @date 2016-01-04
 */
var mysql = require('mysql'),
	$conf = require('../conf/DBConfig'),
	$util = require('../util/util'),
	$sql  = require('./userSqlMapping')

//mysql connect pool
var pool = mysql.createPool($util.extend({}, $conf.mysql));



module.exports = {
	//新增用户
	add : function (req, res, next) {
		pool.getConnection(function (err, connection) {
			//get param
			var param = req.query || req.params;
			connection.query($sql.insert,[param.username, param.password], function (err, result){
				if(result) {
					result = {
						status : 1,
						msg : '操作成功'
					}
				}
				$util.jsonWrite(res, result);
				connection.release();
			});
		});
	},
	login : function (req, res, next) {
		console.log(req.body);
	}
}