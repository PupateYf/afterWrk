var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    content    : {type : String},
    title   : {type : String},
    time    : {type : String}
})

var News = mongodb.mongoose.model('news',todoScheme);

var newsDAO = function(){};

newsDAO.prototype.save = function(obj){
    var instance = new News(obj);
    instance.save();
}
newsDAO.prototype.find = function(conditions, callback, res) {
	var result;
	News.find(conditions, function(err, obj){
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
module.exports = new newsDAO();