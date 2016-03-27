var express = require('express'),
    router = express.Router(),
    activeApi = require('../api/activeApi'),
    chatApi = require('../api/chatApi');


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
    chatApi.ioCreateRooms(req, res, next);
})
router.post('/joinActive', function (req, res, next) {
	activeApi.joinActive(req, res, next);
})


module.exports = router;
