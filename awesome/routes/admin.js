var express = require('express'),
    router = express.Router(),
    adminApi = require('../api/adminApi'),
    activeApi = require('../api/activeApi'),
    suggestApi = require('../api/suggestApi');


router.get('/', function (req,res,next) {
    res.send('respond with a resource');
});
router.post('/login', function (req, res, next) {
	console.log('adminApi call');
	adminApi.login(req, res, next);
});
router.post('/sendNews', function (req, res, next) {
	adminApi.sendNews(req, res, next);
})
router.post('/removeActive', function (req, res, next) {
  activeApi.removeActive(req, res, next);
})
router.post('/loadSuggest', function (req, res, next) {
  suggestApi.loadSuggest(req, res, next);
})
router.post('/loadReport', function (req, res, next) {
  activeApi.loadReport(req, res, next);
})
router.post('/removeReport', function (req, res, next) {
  activeApi.removeReport(req);
  activeApi.removeActive(req, res, next);
})


module.exports = router;
