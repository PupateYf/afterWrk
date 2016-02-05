AppConfig.registerModule('ace.loginSignUp');

var aceLoginSignUp = angular.module('ace.loginSignUp');

aceLoginSignUp.controller('loginSignUpController', ['$scope', '$http', function ($scope, $http) {
	//UI
	$scope.showLogin = true;
	//ajax param init
	$scope.loginData = {
		account : "",
		password : ""
	}
	$scope.signupData = {
		account : "",
		password : "",
		confirm : ""
	}
	// $scope.oFormData = null;
	$scope.oAjaxConfig = {
		method : 'POST',
	};
	//submit function
	$scope.fnSubmit = function (str) {
		if(str == 'login'){
			$.extend($scope.oAjaxConfig,{
				url : '/users/login',
				data : $scope.loginData
			});
		} else {
			$.extend($scope.oAjaxConfig,{
				url : '/users/signup',
				data : $scope.signupData
			});
		}
		// $scope.oFormData = new FormData(form);
		$http($scope.oAjaxConfig).success(function(data,header,config,status){
			console.log('ok');
		});
	}
	//change login or signup
	$scope.fnChange = function (i) {
		if(i == 1) {
			$scope.showLogin = true;
		} else {
			$scope.showLogin = false;
		}
	}


}])
