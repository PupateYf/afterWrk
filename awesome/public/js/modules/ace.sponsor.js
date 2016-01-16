AppConfig.registerModule('ace.sponsor');

var aceSponsor = angular.module('ace.sponsor');

aceSponsor.controller('sponsorController', ['$scope', '$http', function ($scope, $http) {
	//map key 5eeb0f667b7ed1f0de83d7ae57bd468e
	//UI
	$scope.oContent = {
	  	map : {
	  		title : "map",
	  		id : "container",
	  		obj : null,
	  		markers : []
	  	}
	};
	//ajax param init
	$scope.formData = {
		id : "",
		password : ""
	}

	// $scope.oFormData = null;
	$scope.oAjaxConfig = {
		method : 'POST',
	};
	//function
	$scope.fnInitMap = function (){
		var position = new AMap.LngLat(116.397428,39.90923);//天安门
		$scope.oContent.map.obj = new AMap.Map($scope.oContent.map.id,{
			view : new AMap.View2D({
					center : position,//将天安门设在屏幕中心
					zoom : 14,//缩放14倍
					rotation : 0//旋转0
				})
		})
		var map = $scope.oContent.map.obj
		map.plugin('AMap.Geolocation', function() {
		         geolocation = new AMap.Geolocation({
			            enableHighAccuracy: true,//是否使用高精度定位，默认:true
			            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
			            buttonPosition:'RB'
			        });
			map.addControl(geolocation);
			geolocation.getCurrentPosition();
			        // AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
			        // AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});
	}
	$scope.fnMapListenClick = function() {
		AMap.event.addListener($scope.oContent.map.obj, 'click', function(e) {
			var map = $scope.oContent.map.obj;
			map.remove($scope.oContent.map.markers);
			var lnglat = e.lnglat;
			var marker = new AMap.Marker({
				map: $scope.oContent.map.obj,
				position: e.lnglat
				// offset: new AMap.Pixel( - 10, -34)
		            	// content:m
			});
			$scope.oContent.map.markers.push(marker);
			map.setCenter(lnglat);
			openInfo(map,lnglat)
	    	});
	    	//在指定位置打开信息窗体
		function openInfo(map,lnglat) {
		//构建信息窗体中显示的内容
			var info = [];
			info.push("这里将被选为地点");
			infoWindow = new AMap.InfoWindow({
				content: info.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
				offset: new AMap.Pixel(0,-28)
			});
			infoWindow.open(map, lnglat);
		}

	}













}])


// aceSponsor.directive('mapShow', ['$rootScope', function (rootScope) {
// 	return {
// 		link : function (scope, ele, attr){
// 			var offsetTop = $('#mapContain').offset().top,
// 			      docHeight = $(document).height();
// 			$(ele).css({
// 				width : '100%',
// 				height : docHeight - offsetTop
// 			});
// 			var map = new AMap.Map('map');
// 			console.log('map')
// 		}
// 	}
// }])