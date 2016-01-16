AppConfig.registerModule('ace.login');

var aceLogin = angular.module('ace.login');

aceLogin.controller('loginController', ['$scope', '$http', function ($scope, $http) {
	//UI
	$scope.oContent = {
	  "title": "Login",
	};
	//ajax param init
	$scope.formData = {
		id : "",
		password : ""
	}
	// $scope.oFormData = null;
	$scope.oAjaxConfig = {
		url : '/users/login',
		method : 'POST',
		data : $scope.formData
	};
	//submit function
	$scope.fnSubmit = function () {
		var form = document.getElementById('loginForm');
		// $scope.oFormData = new FormData(form);
		$http($scope.oAjaxConfig).success(function(data,header,config,status){
			console.log(ok);
		});
	}



}])