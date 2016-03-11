var express = require('express'),
    router = express.Router();
    workDao = require('../dao/workDao');
var debug = true;
router.get('/', function (req,res,next) {
    res.send('respond with a resource');
});


router.post('/uploadActiveImg', function (req, res, next) {
  workDao.uploadActiveImg(req, res, next);
});
router.post('/createActive', function (req, res, next) {
  debug ? console.log('[/createActive]: call') : {};
});

module.exports = router;
