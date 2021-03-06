var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    account    : {type : String},
    imgName    : {type : String},
    kind       : {type : Number},
    topic      : {type : String},
    datetime   : {type : String},
    locationXY : {type : String},
    gender     : {type : Number},
    count      : {type : Number},
    profile    : {type : String},
    contacts   : {type : String},
    cost       : {type : String},
    whoIn      : {type : Array }
})

var Active = mongodb.mongoose.model('active',todoScheme);

var activeDAO = function(){};

activeDAO.prototype.save = function(obj, callback, res) {
    var instance = new Active(obj);
    var result;
    instance.save(function(err){
        if(err) {
            console.log(err);
            callback(res, result)
        } else {
            console.log('save successfully');
            var result = {
                code : 1,
                msg : '录入成功'
            }
            callback(res, result);
        }
    });
};

activeDAO.prototype.find = function(conditions, fields, options, callback, res) {
    var result;
    Active.find(conditions, fields, options, function(err, obj){
        if(err) {
            console.log(err);
            callback(res, result);
        } else {
            console.log('find successfully');
            var result = {
                code : 1,
                data : obj,
                msg : '查询成功'
            }
            callback(res, result);
        }
    });
}
activeDAO.prototype.update = function(conditions, set, callback, res) {
    var result;
    var dbSet = {$set : set};
    Active.update(conditions, dbSet, function(err, count){
        if(err) {
            console.log(err);
            callback(res, result);
        } else {
            console.log('update successfully in',count);
            var result = {
                code : 1,
                msg : '参加成功'
            }
            callback(res, result);
        }
    });
}
activeDAO.prototype.remove = function(conditions, callback, res) {
    var result;
    Active.remove(conditions, function (error){
        if(error) {
           console.log(error);
           callback(res, result);
        } else {
            console.log('active remove successfully');
            var result = {
                code : 1,
                msg : '删除成功'
            }
            callback(res, result);
        }
    })
}
module.exports = new activeDAO();
