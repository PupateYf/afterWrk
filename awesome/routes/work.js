var express = require('express'),
    router = express.Router(),
    activeApi = require('../api/activeApi'),
    chatApi = require('../api/chatApi'),
    newsApi = require('../api/newsApi'),
    suggestApi = require('../api/suggestApi');
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
router.post('/reportActive', function (req, res, next) {
    activeApi.reportActive(req, res, next);
})
router.get('/chat', function (req, res, next) {
    chatApi.ioCreateRooms(req, res, next);
})
router.post('/joinActive', function (req, res, next) {
	activeApi.joinActive(req, res, next);
})
router.post('/getNews', function (req, res, next) {
	newsApi.getNews(req, res, next);
})
router.post('/submitSuggest', function (req, res, next) {
  console.log('submit suggest call')
  suggestApi.submitSuggest(req, res, next);
})

module.exports = router;
