var express = require('express'),
    router = express.Router(),
    adminApi = require('../api/adminApi');


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



module.exports = router;
