var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    reportActid    : {type : String},
    account   : {type : String},
    time    : {type : String}
})

var Report = mongodb.mongoose.model('report',todoScheme);

var reportDAO = function(){};

reportDAO.prototype.save = function(obj){
    var instance = new Report(obj);
    instance.save();
}
reportDAO.prototype.find = function(conditions, callback, res) {
	var result;
	Report.find(conditions, function(err, obj){
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
module.exports = new reportDAO();