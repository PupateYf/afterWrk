var admin = angular.module('admin',['ngRoute']);

admin.config(['$routeProvider',function($routeProvider) {
	$routeProvider
    //首页
	.when('/index', {
			templateUrl : 'js/adminModules/index.html',
	})
	.when('/login', {
			templateUrl : 'js/adminModules/login.html',
			controller 	: 'loginCtr'
	})
	.when('/sendNews',{
			templateUrl : 'js/adminModules/sendNews.html',
			controller  : 'sendNewsCtr'
	})
    .otherwise({
        redirectTo: '/'
    });
}]);

//主控制
admin.controller('mainCtr',['$scope', '$http', function($scope, $http){
	var account = $.cookie('account');
	var password = $.cookie('password');
	var account = 'admin';
	var password = 'admin';
	var conditions = {
		account : account,
		password : password
	}
	$scope.checkLogin = function(){
		if(!account || !password) location.hash = "#/login";
		$http({
			url : '/admin/login',
			method : 'POST',
			data : {conditions : conditions},
		}).then(function(response){
			if(response.data.code == 1){
				location.hash = "#/index"
			} else {
				location.hash = "#/login"
			}
		},function(err){
			console.log(err)
		})
	}
}])
//登陆控制
admin.controller('loginCtr',['$scope', '$http', function($scope, $http){
	$scope.postContent = {
		account : '',
		password : ''
	}
	$scope.fnLogin = function(){
		$http({
			method : 'POST',
			data : {conditions : $scope.postContent},
			url : '/admin/login'
		}).then(function(response){
			if(response.data.code == 1){
				location.hash = "#/index"
			} else {
				alert('error!')
			}
		},function(err){
			console.log(err)
		})
	}
}])
admin.controller('sendNewsCtr',['$scope', '$http', function($scope, $http){
	$scope.Cont2Send = {
		content : '',
		title : ''
	};
	$scope.sendNews = function(){
		$http({
			method : 'POST',
			data : $scope.Cont2Send,
			url : '/admin/sendNews'
		}).then(function(response){
			if(response.data.code == 1){
				alert('发布成功')
			}
		},function(error){
			console.log(error)
		})
	}

}])
//活动管理
admin.controller('manageCtr',['$scope', '$http',function($scope, $http){
	$scope.activeList=[];
	$scope.fnLoadActive = function (skipNum) {
        var data = {
                conditions : {},
                fields : null,
                options : {}
        }
        var method = 'POST';
        var url = '/work/loadActive';
        $http({
            url : url,
            method : method,
            data : data
        }).then(function(response){
            switch (response.data.code) {
                case 1:{
                    //请求成功，处理数据以供展示
                    console.log('ok');
                    $scope.activeList = $scope.activeList.concat(response.data.data);
                    console.log('activeList', $scope.activeList);
                    break;
                }
                default:{
                    console.log('loadActive error');
                }
            }
        }, function(error){
            console.log(error);
        })
    }
    $scopoe.remove = function(item){
    	var data = {
    			conditions : item
    	}
    	var method = 'POST';
    	var url = '/work/deleteActive';
    	$http({
    		url : url,
    		method : method,
    		data : data
    	}).then(function(response){

    	},function(error){

    	})
    }
}])
