/**
 * @description 与数据库user表的相关的交互
 * @author 杨逸峰
 * @version 0.0.3
 * @date 2016-03-10
 */

var	$util = require('../util/util'),
    formidable = require('formidable'),
    mongoose = require('mongoose');
 		md5 = require('md5'),
    fs = require('fs'),
    UPLOAD_DIR = '/activeBanner/',
    Active = require('../dao/activeDao');

module.exports = {
    createActive : function (req, res, next) {
        // var account = '13580353945'; // for test
        var account = req.cookies.account;
        var param = req.body;
        var todoObj = {
                account    : account,
                imgName    : param.imgName,
                kind       : param.kind,
                topic      : param.topic,
                datetime   : param.date + param.time,
                locationXY : param.locationXY,
                gender     : param.gender,
                count      : param.count,
                profile    : param.profile,
                contacts   : param.contacts,
                cost       : param.cost,
                whoIn      : [account]
        }
        Active.save(todoObj, $util.jsonWrite, res);
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
    },
    loadActive : function (req, res, next) {
        console.log('[POST]:loadActive call');
        var requrest = req.body;
        var conditions = requrest.conditions,
            fields = requrest.fields,
            options = requrest.options;
        // res.json({code:1});
        Active.find(conditions, fields, options, $util.jsonWrite, res);
    }
}
