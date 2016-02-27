AppConfig.registerModule('ace.loginSignUp');

var aceLoginSignUp = angular.module('ace.loginSignUp');

aceLoginSignUp.controller('loginSignUpController', ['$scope', '$http', function ($scope, $http) {
	//UI
	$scope.showLogin = false;

	$scope.validCode = $scope.rawValidCode = "  获取验证码 ";
	$scope.msnReq = true;
	$scope.lockValidTime = 60;
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
	// error message
	$scope.errorMsg = '';
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
		$http($scope.oAjaxConfig)
		.then(function (data) {
			var data = data.data;
			switch (data.code) {
      	case 1: {
					console.log(data.msg);
					window.location.hash = '#/index';
					break;
				}
				default: {
					console.log(data.msg);
					$scope.errorMsg = data.msg;
					break;
				}
      }
		},function (err) {
			 console.log(err);
		})
	}
	//change login or signup
	$scope.fnChange = function (i) {
		if(i == 1) {
			$scope.showLogin = true;
		} else {
			$scope.showLogin = false;
		}
	}

	// get validCode
	$scope.fnLockValidCode = function () {
		if($scope.lockValidTime !== 60) return;
		if($scope.msnReq){
			$scope.msnReq = false;
			$http({
				method: 'POST',
				url: '/users/getValidCode'
			}).then(function (result) {
				console.log(result.data.msg);
			},function (err) {console.log(err)})
		}
		var setTime = function (){
			if ( $scope.lockValidTime == 0) {
				clearInterval(count);
				$scope.validCode = $scope.rawValidCode;
				$scope.lockValidTime = 60;
				$scope.msnReq = true;
			} else {
				$scope.validCode = " 重新发送(" + $scope.lockValidTime + ")";
				console.log($scope.validCode);
				$scope.lockValidTime--;
			}
			$scope.$digest();
		}
		var count = setInterval(function(){setTime()}, 1000)
	}
}])
