AppConfig.registerModule('ace.loginSignUp');

var aceLoginSignUp = angular.module('ace.loginSignUp');

aceLoginSignUp.controller('loginSignUpController', ['$scope', '$http', function ($scope, $http) {
	//UI
	$scope.flag = true

	$scope.oContent = {
	  "title": "Login",
	  "title2": "Sign up"
	};
	//ajax param init
	$scope.formData = {
		id : "",
		password : ""
	}
	$scope.formData2 = {
		id : "",
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
				data : $scope.formData
			});
		} else {
			$.extend($scope.oAjaxConfig,{
				url : '/users/signup',
				data : $scope.formData2
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
			$scope.flag = true;
		} else {
			$scope.flag = false;
		}
	}


}])