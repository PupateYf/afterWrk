/**
 * @description angular routes
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2016-01-04
 */
AppConfig.registerModule('ace.routes');
var aceRouter = angular.module('ace.routes',['ngRoute']);

aceRouter.config(['$routeProvider',function($routeProvider) {
	$routeProvider
    //首页
    .when('/', {
        templateUrl : 'js/modules/html/index.html',
        controller  : 'indexController'
    })
		.when('/index', {
				templateUrl : 'js/modules/html/index.html',
				controller	: 'indexController'
		})
		.when('/news', {
				templateUrl : 'js/modules/html/news.html',
				controller  : 'newsController'
		})
		.when('/createActive', {
				templateUrl : 'js/modules/html/createActive.html',
				controller  : 'activeController'
		})
		.when('/message', {
				templateUrl : 'js/modules/html/message.html',
				controller : 'messageController'
		})
		.when('/loginSignUp', {
				templateUrl : 'js/modules/html/loginSignUp.html',
				controller 	: 'loginSignUpController'
		})

    .when('/sponsor', {
        templateUrl : 'js/modules/html/sponsor.html',
        controller  : 'sponsorController'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);
