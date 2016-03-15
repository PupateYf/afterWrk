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
            console.log('save sucessfully')
            var result = {
                code : 1,
                msg : '录入成功'
            }
            callback(res, result)
        }
    });
};
module.exports = new activeDAO();
