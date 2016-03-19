/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 1.0.0
 * @date 2016-03-15
 */
 var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/afterWrk');
 exports.mongoose = mongoose;
