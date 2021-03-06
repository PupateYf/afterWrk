var express = require('express'),
		router = express.Router(),
		userDao = require('../dao/userDao');
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
	console.log('[login:]call');
	userDao.login(req, res, next);
})

router.post('/signup', function (req, res, next) {
	userDao.signup(req, res, next);
})

router.post('/checkLogin', function (req, res, next) {
	userDao.checkLogin(req, res, next);
})

router.post('/getValidCode', function (req, res, next) {
	userDao.getValidCode(req, res, next);
})

router.post('/getUserInfo', function (req, res, next) {
	userDao.findUserDetail(req.body.account, res);
})

router.post('/updateUserDetail', function (req, res, next) {
	userDao.updateUserDetail(req, res, next);
})

router.post('/updateUserImg', function (req, res, next) {
	userDao.updateUserImg(req, res, next);
})

router.post('/loadUser', function (req, res, next) {
	userDao.loadUser(req, res, next);
})

router.post('/removeUser', function (req, res, next) {
	userDao.removeUser(req, res, next);
})
module.exports = router;
