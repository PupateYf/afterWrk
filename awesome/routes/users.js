var express = require('express'),
	router = express.Router(),
	userDao = require('../dao/userDao');
/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/addUser', function (req, res, next) {
	userDao.add(req, res, next);
})
router.post('/login', function (req, res, next) {
	console.log('*****[login post]*****');
	userDao.login(req, res, next);
})


module.exports = router;
