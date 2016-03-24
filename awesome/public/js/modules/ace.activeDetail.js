AppConfig.registerModule('ace.activeDetail');

var aceActDetail = angular.module('ace.activeDetail');

aceActDetail.controller('actDetailController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.item;
    $scope.activeId;
    $scope.$on('show-active-detail', function(e, item){
        $scope.item = item;
        $scope.activeId = item.imgName + item.account;
    })

    //加入群聊
    $scope.fnJoinChat = function(){
        $scope.$broadcast('start-chat',$scope.activeId);
        fnChatConnect();
    }
    var fnChatConnect = function () {
        var method = 'GET';
        var url = '/work/chat?activeid=' + $scope.activeId;
        $http({
            method : method,
            url : url
        }).then(function(response){

        },function(err){

        });
    }


}])
