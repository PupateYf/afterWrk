var $util = require('../util/util'),
		mongoose = require('mongoose'),
		md5 = require('md5'),
		Admin = require('../dao/adminDao'),
		Active = require('../dao/activeDao'),
		News = require('../dao/newsDao');

module.exports = {
	login : function(req, res, next) {
		var request = req.body.conditions;
		var result;
		console.log(request);
		if(request.password == 'admin' && request.account == 'admin'){
				console.log('if')
				res.cookie('admin', 'admin', { expires: new Date(Date.now() + 15*60*1000)});
				res.cookie('adminPsd', 'admin', { expires: new Date(Date.now() + 15*60*1000)});
				result = {
						code : 1,
						msg : '查询成功'
				}
		}
		$util.jsonWrite(res,result);
	},
	sendNews : function (req, res, next) {
		var request = req.body;
		var now = new Date();
		var time = [now.getFullYear(),now.getMonth(),now.getDate()].join('-')+' '+now.getHours()+':'+now.getMinutes();
		console.log(request);
		var conditions = {
			title : request.title,
			content : request.content,
			time : time
		}
		News.save(conditions);
		$util.jsonWrite(res,{code:1})
	},
	loadReport : function (req, res, next) {
		console.log('loadReport call');
		var conditions = req.body.conditions;
		Report.find(conditions, $util.jsonWrite, res)
	},
	removeReport : function (req, res, next) {
			console.log('removeReport call');
			var request = req.body;
			var conditions = request.conditions2;
			Report.remove(conditions);
	}
}
