/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.3
 * @date 2016-03-10
 */

var	sqlite3 = require('sqlite3').verbose(),
   	$util = require('../util/util'),
   	DBname = require('../DB/DBConfig').name,
    formidable = require('formidable'),
 		md5 = require('md5'),
    fs = require('fs'),
    UPLOAD_DIR = '/activeBanner/';

var $sql = {
    insert : 'INSERT INTO active(account, imgName, kind, topic, dateTime, locationXY, gender, count, profile, contacts, cost) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
};

module.exports = {
    createActive : function (req, res, next) {
        var account = '13580353945'; // for test
        // var account = req.cookies.account;
        var param = req.body;
        var result;
        var db = new sqlite3.Database(DBname);

        //need to get account from cookies;
        //need to format the datetime;
        var date = param.date,
            time = param.time;
        var datetime = date + time;
        db.run($sql.insert,[account, param.imgName, param.kind, param.topic, datetime, param.locationXY, param.gender, param.count, param.profile, param.contacts, param.cost],function (err, row){
            if(err){
                console.log(err);
                result = {
                  code: -100,
                  msg: '服务器繁忙'
                }
            } else {
                result = {
                  code : 1,
                  msg : '录入成功'
                }
            }
            db.close();
            $util.jsonWrite(res, result);
        })
    },
    uploadActiveImg : function (req, res, next) {
      console.log('[post]:upload method call');
      var quene = new formidable.IncomingForm();
          quene.encoding = 'utf-8';
          quene.uploadDir = 'upload' + UPLOAD_DIR;
          quene.keepExtensions = true;
          quene.maxFieldsSize = 5*1024*1024;
          quene.parse(req, function (err, fields, files) {
            if (err) {
              res.locals.error = err;
              return;
            }
            var extName = '',temp = '',filePath = '',fileName = '';
            //获取类型
            for(item in files){
              if(files[item].hasOwnProperty('type')){
                temp = files[item].type;
                fileName = files[item].name;
                filePath = files[item].path;
                break;
              }
            }
            //判断图像类型
            switch (temp) {
              case 'image/pjpeg':
                extName = 'jpg';
                break;
              case 'image/jpeg':
                extName = 'jpg';
                break;
              case 'image/png':
                extName = 'png';
                break;
              case 'image/x-png':
                extName = 'png';
                break;
              case 'image/bmp':
                extName = 'bmp';
                break;
              case 'image/gif':
                extName = 'gif';
                break;
            }
            //非图像
            if(extName.length == 0){
              res.console.error('only img');
              //fail
              res.json({
                  'code' : -1,
                  'msg'    : 'The upload file with an error format'
              })
              return;
            }
            //success
            //重命名
            newName = fileName +'.'+extName,
            newPath = quene.uploadDir + newName;
            fs.renameSync(filePath, newPath);
            //写数据库
            res.json({
                'code' : 1,
                'msg'    : 'upload has been finished',
                'data'   : files
            });
          });
    }
}
