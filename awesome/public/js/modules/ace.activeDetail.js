AppConfig.registerModule('ace.activeDetail');

var aceActDetail = angular.module('ace.activeDetail');

aceActDetail.controller('actDetailController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.item;

    $scope.$on('show-active-detail', function(e, item){
        $scope.item = item;
    })
}])
