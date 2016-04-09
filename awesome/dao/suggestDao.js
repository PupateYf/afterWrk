var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    account :{type : String},
    content    : {type : String},
    time    : {type : String}
})

var Suggest = mongodb.mongoose.model('suggest',todoScheme);

var suggestDAO = function(){};

suggestDAO.prototype.save = function(obj){
    var instance = new Suggest(obj);
    instance.save();
}
suggestDAO.prototype.find = function(conditions, fields, options, callback, res) {
	var result;
	Suggest.find(conditions, fields, options, function(err, obj){
		if(err){
  			console.log(err);
  			callback(res, result);
		} else {
  			console.log('find successfully');
  			if(obj){
    				var result = {
                    code : 1,
                    data : obj,
                    msg : '查询成功'
  	        }
	          callback(res, result);
			} else {
				    callback(res, result);
			}
		}
	})
}
suggestDAO.prototype.remove = function(conditions, callback, res) {
    var result;
    Suggest.remove(conditions, function (error) {
        if(error) {
           console.log(error);
           callback(res, result);
        } else {
            console.log('remove successfully');
            var result = {
                code : 1,
                msg : '删除成功'
            }
            callback(res, result);
        }
    })
}
module.exports = new suggestDAO();
