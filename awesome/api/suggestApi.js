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
  	}
}
