var express = require('express'),
	router = express.Router(),
	userDao = require('../dao/userDao');
/* GET users listing. */

router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});


router.post('/login', function (req, res, next) {
	userDao.login(req, res, next);
})

router.post('/signup', function (req, res, next) {
	userDao.signup(req, res, next);
})


module.exports = router;
