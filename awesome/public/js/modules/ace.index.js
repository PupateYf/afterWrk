/**
 * @description angular controller of index
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2016-01-04
 */
AppConfig.registerModule('ace.index');

var aceIndex = angular.module('ace.index');

aceIndex.controller('indexController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.activeList = [];
    $scope.oHeaderUI = {
        neighbor : true,
        hot : false
    }
    $scope.fnSetHeader = function (flag) {
        var obj = $scope.oHeaderUI;
        if(flag){
            obj.neighbor = true,
            obj.hot = false;
        } else {
            obj.neighbor = false,
            obj.hot = true;
        }
    }
    $scope.fnJoin = function (item) {
        console.log('show-active-detail broadcast');
        // $scope.$broadcast('show-active-detail', item);
    }
    var geocoder = new AMap.Geocoder();
    var geolocation = new AMap.Geolocation();
    var currentLntlat;
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', function(result){
        console.log(result);
        //初始化当前位置
        currentLntlat = new AMap.LngLat(result.position.lng, result.position.lat);
        //初始化距离
        var activeList = $scope.activeList;
        for(var i = 0; i < activeList.length; i++) {
            if(activeList[i].distance) continue;
            else {
                var Lntlat = activeList[i].locationXY.split('-');
                $.extend(activeList[i],{
                    distance : (currentLntlat.distance(Lntlat)/1000).toFixed(1)+'km'
                });
                $scope.$apply();
            }
        }
    });


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
    $scope.skipNum = 0; // 初始化数据库查询skip参数
    //初始化首页活动过数据
    $scope.fnLoadActive = function (skipNum) {
        var data = {
                conditions : {},
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
    $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
        $scope.fnLoadActive(0)
    });
    //for init
}])
