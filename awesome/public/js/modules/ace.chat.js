AppConfig.registerModule('ace.chat');

var aceActDetail = angular.module('ace.chat');

aceActDetail.controller('aceChatController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.id;
    var fnChatConnect = function () {
        var method = 'GET';
    }
    $scope.$on('start-chat', function(e, id){
        $scope.id = id;
        fnChatConnect();
    })
}])
