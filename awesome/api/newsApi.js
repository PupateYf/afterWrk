var $util = require('../util/util'),
	mongoose = require('mongoose'),
	md5 = require('md5'),
	News = require('../dao/newsDao');

module.exports = {

	getNews : function (req, res, next) {
		var request = req.body;
		var conditions = request.conditions
		News.find(conditions,$util.jsonWrite,res);
	}
}