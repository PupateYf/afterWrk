var $util = require('../util/util'),
		mongoose = require('mongoose'),
		md5 = require('md5'),
		Suggest = require('../dao/suggestDAO');

module.exports = {
    submitSuggest : function (req, res, next) {
	  		var request = req.body;
	  		var account = req.cookies.account,
	  				content = request.content,
	  				time = new Date().getTime();
	  		var todoObj = {
	  				account : account,
	  				content : content,
	  				time : time
	  		}
	  		Suggest.save(todoObj);
	  		$util.jsonWrite(res,{code:1,msg:'提交成功'});
  	},
		loadSuggest : function (req, res, next) {
				console.log('loadSuggest call');
				var request = req.body;
				var conditions = request.conditions,
						fields = request.fields,
						options = request.options;
				Suggest.find(conditions, fields, options, $util.jsonWrite, res);
		},
		removeSuggest : function (req, res, next) {
        console.log('removeSuggest call');
        var conditions = req.body.conditions;
        Suggest.remove(conditions, $util.jsonWrite, res);
    }
}
