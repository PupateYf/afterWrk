var express = require('express'),
    router = express.Router();
    activeApi = require('../api/activeApi');
var debug = true;
router.get('/', function (req,res,next) {
    res.send('respond with a resource');
});


router.post('/uploadActiveImg', function (req, res, next) {
    activeApi.uploadActiveImg(req, res, next);
});
router.post('/createActive', function (req, res, next) {
    activeApi.createActive(req, res, next);
});
router.post('/loadActive', function (req, res, next) {
    activeApi.loadActive(req, res, next);
});
router.get('/chat', function (req, res, next) {
    console.log(req.params);
})


module.exports = router;
