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
	// data which will be send to createActive controller
	$scope.data2CA = {
			locationXY : '',//lng-lat 经纬度
			location: ''
	};
	//AMap util
	$scope.util = {};
	//function
	$scope.fnInitMap = function (){
		$.extend($scope.util,{
				render : function() {
						var position = new AMap.LngLat(116.397428,39.90923);//天安门
						$scope.oContent.map.obj = new AMap.Map($scope.oContent.map.id,{
							view : new AMap.View2D({
									center : position,//将天安门设在屏幕中心
									zoom : 14,//缩放14倍
									rotation : 0//旋转0
								}),
							resizeEnable: true,
							keyboardEnable: false
						})
				},
				//在指定位置创建标记
				createMarker: function(map, position) {
						var marker = new AMap.Marker({
								map : map,
								position : position
						})
						$scope.data2CA.locationXY = position.lng + '-' + position.lat;
						return marker;
				},
				//在指定位置打开信息窗体
				openInfo: function(map, lnglat, info) {
						//构建信息窗体中显示的内容
						var msg = [];
						$scope.data2CA.location = info;
						var info1 = info.substring(0 , info.length/2);
						var info2 = info.substring(info.length/2, info.length);
						msg.push(info1);
						msg.push(info2);
						infoWindow = new AMap.InfoWindow({
						content: msg.join("<br/>"),  //使用默认信息窗体框样式，显示信息内容
						offset: new AMap.Pixel(0,-28)
						});
						infoWindow.open(map, lnglat);
						console.log($scope.data2CA);
				},
				resetMarkers: function (map, position) {
					map.remove($scope.oContent.map.markers);
					var marker = this.createMarker(map, position);
					$scope.oContent.map.markers.push(marker);
					map.setCenter(position);
				}
		});
		$scope.util.render();
		AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder', 'AMap.Geolocation'], function () {
      var autoOptions = {
        input: 'keyword'//使用联想输入的input的id
      };
      var autocomplete = new AMap.Autocomplete(autoOptions);
			var geocoder = new AMap.Geocoder();
			var placeSearch = new AMap.PlaceSearch({
            city: '广州',
            map: $scope.oContent.map.obj
      });
			$.extend($scope.util,{
					autocomplete : autocomplete,
					geocoder : geocoder,
					placeSearch : placeSearch
			})
			var geolocation = new AMap.Geolocation({
					 enableHighAccuracy: true,//是否使用高精度定位，默认:true
					 timeout: 10000,          //超过10秒后停止定位，默认：无穷大
					 buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
					 zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
					 buttonPosition:'RB'
			 });
			$scope.oContent.map.obj.addControl(geolocation);
    });
		AMap.event.addListener($scope.util.autocomplete, "select", function(e){
			 $scope.util.placeSearch.search(e.poi.name,function(status, result){
				 if(status === 'complete'){
					 var map = $scope.oContent.map.obj;
					 var pointLng = result.poiList.pois[0].location.lng,
							 pointLat = result.poiList.pois[0].location.lat;
					 var position = new AMap.LngLat(pointLng, pointLat);
					 map.setCenter(position);
					 $scope.util.resetMarkers(map, position);
	 				//获取地名
	 				$scope.util.geocoder.getAddress(position,function(status,result){
	 						var info;
	 						if(status === 'complete') {
	 							 info = result.regeocode.formattedAddress;
	 						} else {
	 							 info = '无法获取地址';
	 						}
	 						$scope.util.openInfo(map, position, info);
	 						return;
	 				})

				 }
			 });
		});
		AMap.event.addListener($scope.oContent.map.obj, 'click', function(e) {
				var map = $scope.oContent.map.obj;
				map.remove($scope.oContent.map.markers);
				var position = e.lnglat;
				$scope.util.resetMarkers(map, position);
				//获取地名
				$scope.util.geocoder.getAddress(position,function(status,result){
						var info;
						if(status === 'complete') {
							 info = result.regeocode.formattedAddress;
						} else {
							 info = '无法获取地址';
						}
						$scope.util.openInfo(map, position, info);
						return;
				})
		});
		console.log('[aceSponsor] ', $scope);
	}// END OF init

	$scope.fnSetLocation = function () {
		// 向上查找createActive 中的 $scope.rawActiveData 以及 $scope.activeUIData 设定locationXY 以及 location 的值
		var obj = $scope.$parent;
		// 查找开始
		while (!obj.hasOwnProperty('rawActiveData')) {
			obj = obj.$parent;
		}
		obj.rawActiveData.locationXY = $scope.data2CA.locationXY;
		obj.activeUIData.location = $scope.data2CA.location;
	}


}])

//生成marker


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
