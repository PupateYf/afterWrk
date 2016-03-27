var $util = require('../util/util'),
	mongoose = require('mongoose'),
	md5 = require('md5'),
	Admin = require('../dao/adminDao'),
	News = require('../dao/newsDao')

module.exports = {
	login : function(req, res, next) {
		var request = req.body;
		console.log(request);
		var conditions = {account : 'admin'},
			fields = null,
			options = {};
		// Admin.save();
		Admin.findOne(conditions, fields, options, $util.jsonWrite, res);
	},
	sendNews : function (req, res, next) {
		var request = req.body;
		console.log(request);
		var conditions = {
			title : request.title,
			content : request.content
		}
		News.save(conditions);
		$util.jsonWrite(res,{code:1})
	}
}