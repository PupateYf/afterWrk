var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    account    : {type : String},
    password   : {type : String}
})

var Admin = mongodb.mongoose.model('admins',todoScheme);

var adminDAO = function(){};

adminDAO.prototype.save = function(){
    var instance = new Admin({account:'admin',password:'admin'});
    instance.save();
}

adminDAO.prototype.findOne = function(conditions, fields, options, callback, res) {
    Admin.findOne(conditions, fields, options, function(err, obj){
        console.log(conditions);
        if(err) {
            console.log(err);
            callback(res, result);
        } else {
            console.log('find successfully');
            console.log(obj);
            if(obj) {
                var result = {
                    code : 1,
                    msg : '查询成功'
                }
                res.cookie('account', obj.account, { expires: new Date(Date.now() + 15*60*1000)});
                res.cookie('password', obj.password, { expires: new Date(Date.now() + 15*60*1000)});
                callback(res, result);
            }
            else {
                var result = {
                    code : 0,
                    msg : 'false'
                }
                callback(res, result);
            }
        }
    });
}

module.exports = new adminDAO();
