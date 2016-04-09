AppConfig.registerModule('ace.message');

var aceMessage = angular.module('ace.message');

aceMessage.controller('messageController',['$scope','$http',function($scope, $http) {
	$scope.activeList = [];
  $scope.contactContent;
	$scope.userImg;
	$scope.skipNum = 0;
	$scope.loading != 1;
	$scope.successTip = !1;
	$scope.initUserImg = function(){
			$scope.userImg = $.cookie('userImg');
	}

	$scope.fnLoadActive = function (skipNum) {
			var data = {
							conditions : {whoIn : $scope.userImg},
							fields : null,
							options : {
										skip : skipNum,
										limit : 10
							}
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
									$scope.loading = !1;
									$scope.activeList = $scope.activeList.concat(response.data.data);
									$scope.skipNum += 10;
									console.log('message.html activeList', $scope.activeList);
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
	$scope.getMore = function(skipNum){
			$scope.loading = !0;
			$scope.fnLoadActive(skipNum);
	}
	$scope.fnSubmitSuggest = function () {
			$http({
					url : 'work/submitSuggest',
					method : 'POST',
					data : {content : $scope.contactContent}
			}).then(function(response){
					console.log('fnSubmitSuggest call successfully', response);
					$scope.successTip = !0;
					setTimeout(function(){$scope.successTip = !1;$scope.$apply()},1000);
			},function(error){
					console.log(error);
			})
	}
	$scope.$on('$viewContentLoaded', function(){
	//Here your view content is fully loaded !!
			$scope.initUserImg();
			$scope.fnLoadActive(0);

	});

	var geocoder = new AMap.Geocoder();
	var geolocation = new AMap.Geolocation();
	var currentLntlat;
	var regeocoder = function(lnglatXY, item) {  //逆地理编码
			geocoder.getAddress(lnglatXY, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
							var address = result.regeocode.formattedAddress;
							$.extend(item, {address:address});
							$scope.$apply();
							return;
					} else {
							return 'Null';
					}

			});
	}
	$scope.fnSetLocation = function (item) {
			if(item.addressGet) return;
			else {
					$.extend(item, {addressGet : true})
			}
			var lnglatXY = item.locationXY.split('-');
			regeocoder(lnglatXY, item);
	}


}])
