AppConfig.registerModule('ace.activeDetail');

var aceActDetail = angular.module('ace.activeDetail');

aceActDetail.controller('actDetailController', ['$scope', '$http', function ($scope, $http) {
    //UI
    $scope.item;
    $scope.activeId = parseInt($scope.item.imgName)
    //加入群聊
    $scope.fnJoinChat = function(){
        //传递活动id作为唯一socket
        location.href = location.origin + '/chat.html?activeId=' + $scope.activeId;
    }
    $scope.fnJoinActive = function(){
        var doc = $scope.item,
            set = $scope.item.whoIn.push(userImg),
            method = 'POST',
            url = '/work/joinActive';
        $http({
            method : method,
            url : url,
            data : {
                doc : doc,
                set : set
            }
        }).then(function(response){

        },function(error){
            console.log(error);
        })
    }

}])
