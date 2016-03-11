var express = require('express'),
    router = express.Router();

var debug = true;
router.get('/', function (req,res,next) {
    res.send('respond with a resource');
});


router.post('/uploadActiveImg', function (req, res, next) {
  debug ? console.log('[/createActive]: call') : {};
});
router.post('/createActive', function (req, res, next) {
  debug ? console.log('[/createActive]: call') : {};
});
