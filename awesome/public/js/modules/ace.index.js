/**
 * @description angular controller of index
 * @author 杨逸峰
 * @version 0.0.1
 * @date 2016-01-04
 */
AppConfig.registerModule('ace.index');

var aceIndex = angular.module('ace.index');

aceIndex.controller('indexController', ['$scope', '$http', function ($scope, $http) {
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
    
}])
