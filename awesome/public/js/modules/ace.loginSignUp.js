AppConfig.registerModule('ace.loginSignUp');

var aceLoginSignUp = angular.module('ace.loginSignUp');

aceLoginSignUp.controller('loginSignUpController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	// UI
	$scope.showLogin = false;
	// 验证码
	$scope.validCode = $scope.rawValidCode = "  获取验证码 ";
	$scope.msnReq = true;
	$scope.lockValidTime = 60;
	// permit to login
	$scope.permission = false;
	$scope.validCodePermission = false;
	//ajax param init
	$scope.loginData = {
		account : "",
		password : ""
	}
	$scope.signupData = {
		validCode : "",
		password : "",
		account : ""
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
			if(!$scope.permission) return;
			$.extend($scope.oAjaxConfig,{
				url : '/users/signup',
				data : $scope.signupData
			});
		}
		// $scope.oFormData = new FormData(form);
		$http($scope.oAjaxConfig)
		.then(function (data) {
			var data = data.data;
			$rootScope.USERDATA = data.data;
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
		if(!$scope.validCodePermission) return;
		if($scope.msnReq){
			$scope.msnReq = false;
			$http({
				method: 'POST',
				url: '/users/getValidCode',
				data: $scope.signupData
			}).then(function (result) {
				switch (result.data.code) {
						case 1: {
								console.log(result.data.msg);
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
								break;
						}
						default:{
								$scope.errorMsg = result.data.msg;
								console.log(result.data.msg);
								break;
						}
				}
			},function (err) {console.log(err)})
		}
	}
}])

aceLoginSignUp.directive('ngRsterr', [function(){
	return {
		link : function (scope, element, attrs) {
			element.bind('keydown', function (e) {
				scope.$parent.errorMsg = '';
				scope.$apply();
			})
		}
	}
}])

aceLoginSignUp.directive('ngSbchck', function(){
	return {
		link : function (s, ele, attrs) {
			ele.bind('click', function (e) {
					var obj = attrs.ngClick.match('signup')||attrs.ngClick.match('ValidCode') ? s.$parent.signupData : s.$parent.loginData;
					var valided = 0, itemcount = 0, validCodeRequire = 0;
					for (item in obj) {
						itemcount++;
						switch(item){
								case 'account': {
										if(!(/^1[3|4|5|7|8]\d{9}$/.test(obj[item]))){
											s.$parent.errorMsg = '手机号码格式错误';
											s.$apply();
											break;
										}
										valided++;
										validCodeRequire++;
										break;
								}
								case 'password': {
										if(obj[item] === ''){
											s.$parent.errorMsg = '请填写密码';
											s.$apply();
											break;
										}
										valided++;
										validCodeRequire++;
										break;
								}
								case 'validCode': {
										if(obj[item] === ''){
											s.$parent.errorMsg = '请填写验证码';
											s.$apply();
											break;
										}
										valided++;
										break;
								}
						}// end of switch
					}// end of for
					if(valided === itemcount){
						s.$parent.permission = true;
					} else {
						s.$parent.permission = false;
					}
					if(validCodeRequire == 2){
						s.$parent.validCodePermission = true;
					} else {
						s.$parent.validCodePermission = false;
					}
			})
		}
	}
})
