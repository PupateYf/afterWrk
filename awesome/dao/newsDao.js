var mongodb = require('../DB/DBinit');
var Schema = mongodb.mongoose.Schema;

var todoScheme = new Schema({
    content    : {type : String},
    title   : {type : String}
})

var News = mongodb.mongoose.model('news',todoScheme);

var newsDAO = function(){};

newsDAO.prototype.save = function(obj){
    var instance = new News(obj);
    instance.save();
}
module.exports = new newsDAO();