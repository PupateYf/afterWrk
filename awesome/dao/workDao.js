/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.3
 * @date 2016-03-07
 */

 var	sqlite3 = require('sqlite3').verbose(),
   		$util = require('../util/util'),
   		DBname = require('../DB/DBConfig').name,
      formidable = require('formidable'),
   		md5 = require('md5');

var debug = true;

module.exports = {
    createActive : function (req, res, next) {

    },
    uploadActiveImg : function (req, res, next) {

    }
}
