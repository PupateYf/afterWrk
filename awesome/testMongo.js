var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var $util = require('./util/util')

mongoose.connect('mongodb://localhost/afterWrk');

var ActiveSchema = new Schema({
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

var Active = mongoose.model('actives', ActiveSchema);

// 实例化
// var todoObj = require('dao/activeDAO');

// var conditions = {};
// var fields = null;
// var options = {skip:10, limit:10};
// var callback = $util.jsonWrite;
// todoObj.find(conditions, fields, options, callback, res);


// Active.find({},null,{skip:10,limit:10}, function(err, obj){
//     if(err){
//        console.log(err);
//     } else {
//        console.log(obj);
//     }
// })



var tmpArr = [];
var createTmpData = function() {
    for(var i = 0; i < 30 ; i++) {
        tmpArr.push({
            account    : '13580353945',
            imgName    : '1458123999732.jpg',
            kind : 1,
            topic : "这一行是主题",
            datetime : 1463323140000 + i * 60 * 1000,
            locationXY : "116.398801-39.907218",
            gender : 1,
            count : 15,
            profile : "这是详情，详情，详情，重要的事情说三遍",
            contacts : "Mr.John-13580353945",
            cost : "15-15元用于埋单",
            whoIn : [ "13580353945.png","13798111091.png" ]
        })
    }
}

createTmpData();

Active.insertMany(tmpArr,function(err, docs) {
    if(err) {
        console.log(err);
    } else {
        console.log('save sucessfully');
        console.log(docs);
    }
})
